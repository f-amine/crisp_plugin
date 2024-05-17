const express = require("express");
const LightFunnelsBot = require("./lf_bot");

const pluginUrn = "urn:amine.frira:lftest:0";
const crispAPIIdentifier = "a41a28ec-9077-477b-a1d7-2e8bb260ee34";
const crispAPIKey = "8f3a9689a538e57aab67b2168f21378a6dbc52566c93f19af582c170ba61aeff";
const client= require("langsmith");
const { v4: uuidv4 } = require("uuid"); 
const app = express();
const port = 1234;
const uniqueId = uuidv4().slice(0, 8);

process.env.LANGCHAIN_TRACING_V2 = "true";
process.env.LANGCHAIN_PROJECT = `JS Tracing Walkthrough - ${uniqueId}`;
process.env.LANGCHAIN_ENDPOINT = "https://api.smith.langchain.com";
process.env.LANGCHAIN_API_KEY = "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";

const plugin = new LightFunnelsBot(
  pluginUrn,
  crispAPIIdentifier,
  crispAPIKey
);	

app.use(express.json());

app.use("/", express.static("public"));

app.use("/config/update", ((req) => {
    const websiteId = req.body.website_id;
    const message = req.body.message;
    const token = req.body.token;

    plugin.updateMessageForWebsite(websiteId, token, message)
}));

app.listen(port, () => {
    console.log(`Plugin now listening on port :${port}`)
});
