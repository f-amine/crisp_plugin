"use strict";

const Crisp = require("crisp-api");
require('dotenv').config();
const { OpenAIEmbeddings } = require("@langchain/openai");
const { CheerioWebBaseLoader } = require("langchain/document_loaders/web/cheerio");
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnablePassthrough, RunnableSequence } = require("@langchain/core/runnables");
const { formatDocumentsAsString } = require("langchain/util/document");
const { ChatGroq } = require("@langchain/groq");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { Chroma } = require("@langchain/community/vectorstores/chroma");
const { CharacterTextSplitter } = require("langchain/text_splitter");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { DirectoryLoader } = require("langchain/document_loaders/fs/directory");
const { HumanMessage, AIMessage } = require("@langchain/core/messages");
const { MessagesPlaceholder } = require("@langchain/core/prompts");
const { createStuffDocumentsChain } = require("langchain/chains/combine_documents");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { createRetrievalChain } = require("langchain/chains/retrieval");
const { createHistoryAwareRetriever } = require("langchain/chains/history_aware_retriever");

const retrieverPrompt = ChatPromptTemplate.fromMessages([
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
  [
    "user",
    "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
  ],
]);



class LightFunnelsBot {
  constructor(pluginUrn, crispAPIIdentifier, crispAPIKey) {
    this.crispClient = new Crisp();
    this.websites = new Map();

    this._pluginUrn = pluginUrn;conversatio
    this._apiIdentifier = crispAPIIdentifier;
    this._apiKey = crispAPIKey;

    this._initPlugin();
    this.chain = this.processDocuments();

  }
  async processDocuments() {
    // const loader = new DirectoryLoader(
    //   "lfdocs",
    //   {
    //     ".txt": (path) => new TextLoader(path),
    //   }
    // );
    // const docs = await loader.load();


  
    // const textSplitter = new CharacterTextSplitter({
    //   separator: " ",
    //   chunkSize: 1000,
    //   chunkOverlap: 200,
    // });
    // const docSplits = await textSplitter.splitDocuments(docs);
  
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama3-70b-8192"
    });
    const vectorStore = await Chroma.fromExistingCollection(new OpenAIEmbeddings(), {
      collectionName: "a-test-collection",
      url: "http://localhost:8000",
      collectionMetadata: {
        "hnsw:space": "cosine",
      }, 
    });
    // const vectorStore = await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
    //   collectionName: "a-test-collection",
    //   url: "http://localhost:8000",
    //   collectionMetadata: {
    //     "hnsw:space": "cosine",
    //   }, 
    // });
    const retriever = vectorStore.asRetriever(1);
    const retrieverChain = await createHistoryAwareRetriever({
      llm: model,
      retriever,
      rephrasePrompt: retrieverPrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a customer support agent for lightfunnels and you are helping a customer with a question.
        Answer the question based only on the provided context.
        If the provided context is not enough to answer the question, ask the customer to send an email to the human support team. and tell them you are sorry for the inconvenience.
        Think step by step before providing a helpful and concise answer.
        IF an image is releveant make sure to include it in the answer in markdown format (with it's link)
        also make sure to include the URL Source in the response if it exists in the context
        Context: {context}`,
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const chain = await createStuffDocumentsChain({
      llm: model,
      prompt: prompt,
    });
    const conversationChain = await createRetrievalChain({
      combineDocsChain: chain,
      retriever: retrieverChain,
    });
    return conversationChain;
  
  }
  updateMessageForWebsite(websiteId, token, message) {
    if (token !== this.websites[websiteId].token) {
      console.error("Tokens does not match! Retry with a valid token.");

      return;
    }

    this.crispClient.plugin.updateSubscriptionSettings(
      websiteId,
      this._pluginId,

      { message: message }
    )
      .then(() => {
        this.websites[websiteId] = { message: message };

        console.log(
          `Successfully updated plugin config for website ID: ${websiteId}`
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  _initPlugin() {
    this.crispClient.authenticateTier(
      "plugin", this._apiIdentifier, this._apiKey
    );

    // Retrieve plugin ID for later use.
    this.crispClient.plugin.getConnectAccount()
      .then(response => {
        this._pluginId = response.plugin_id;

        console.log(`Successfully retrived plugin ID: ${this._pluginId}`);
      })
      .catch(error => {
        console.error(error);
      });

    this.crispClient.plugin.listAllConnectWebsites(1, false)
      .then(websites => {
        let nbWebsites = (websites || []).length;

        if (nbWebsites === 0) {
          console.error(
            "No connected website retrieved. " +
              "Please add a trusted website in your Marketplace settings."
          );
        } else {
          for (const website of websites) {
            const message = website.settings.message || "Default message";

            this.websites[website.website_id] = {
              token: website.token,
              message: message,
            }

            nbWebsites++;
          }

          console.log(`Retrieved ${nbWebsites} connected websites!`);
          console.log("Websites configurations:");
          console.log(this.websites);
          this._events();
        }
      })
      .catch(error => {
        console.error(error)
      });
  }

	_events() {
    const self = this;
    this.crispClient.on("message:received", async (event) => {
      try {
        if (!event.content) {
          throw new Error("No question provided");
        }
        const timestampBefore = Date.now() - 60 * 60 * 1000;
        const convo = await self.crispClient.website.getMessagesInConversation(event.website_id, event.session_id);
        const recentMessages = convo.filter(message => new Date(message.timestamp).getTime() >= timestampBefore);
        const chatHistory = recentMessages.map(message => {
          if (message.user.nickname === 'Lightfunnels-AI') {
            return new AIMessage(message.content);
          } else {
            return new HumanMessage(message.content);
          }
        });
        const messages = recentMessages.map(message => message.content);
        
        const chain = await this.chain;
        const result = await chain.invoke({
          chat_history: chatHistory.slice(0, -1),
          input: event.content
        });
        console.log("Result:", result);

        
        self.crispClient.website.sendMessageInConversation(
          event.website_id,
          event.session_id,
          {
            type: "text",
            from: "user",
            origin: self._pluginUrn,
            content: result.answer,
            user: {
              type: "participant",
              nickname: "Lightfunnels-AI",
              avatar: "https://www.lightfunnels.com/images/lightfunnels-logo.svg",
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
      } catch (error) {
        console.error('Error:', error);
      }
    });
    this.crispClient.on("message:send", (event) => {
        // console.log("Got \"message:send\" event:", event);
    });
    console.log("Now listening for events...");
	}
}
module.exports = LightFunnelsBot;

// maybe use smaller model to do other stuff
// one request to summarizee chat history + query and create one query  
// 
