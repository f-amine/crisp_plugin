const axios = require('axios');
const fs = require('fs');
const path = require('path');

const urls = [
    "https://docs.lightfunnels.com/what-is-lightfunnels/",
    "https://docs.lightfunnels.com/managing-accounts/",
    "https://docs.lightfunnels.com/creating-an-account/",
    "https://docs.lightfunnels.com/adding-a-product/",
    "https://docs.lightfunnels.com/importing-a-product/",
    "https://docs.lightfunnels.com/product-reviews/",
    "https://docs.lightfunnels.com/importing-product-reviews/",
    "https://docs.lightfunnels.com/ai/",
    "https://docs.lightfunnels.com/lightfunnels-stock-management-documentation/",
    "https://docs.lightfunnels.com/introduction-to-the-funnel-builder/",
    "https://docs.lightfunnels.com/funnel-pages/",
    "https://docs.lightfunnels.com/ecommerce-funnel/",
    "https://docs.lightfunnels.com/create-a-lead-generation-funnel/",
    "https://docs.lightfunnels.com/split-tests/",
    "https://docs.lightfunnels.com/currencies/",
    "https://docs.lightfunnels.com/introduction-to-the-page-builder/",
    "https://docs.lightfunnels.com/page-elements/",
    "https://docs.lightfunnels.com/elements-styles/",
    "https://docs.lightfunnels.com/elements-layout/",
    "https://docs.lightfunnels.com/responsiveness/",
    "https://docs.lightfunnels.com/data-binding/",
    "https://docs.lightfunnels.com/order-fulfillment/",
    "https://docs.lightfunnels.com/editing-an-order/",
    "https://docs.lightfunnels.com/canceling-an-order/",
    "https://docs.lightfunnels.com/refunding-orders/",
    "https://docs.lightfunnels.com/abandoned-checkouts/",
    "https://docs.lightfunnels.com/discounts/",
    "https://docs.lightfunnels.com/dashboard-metrics/",
    "https://docs.lightfunnels.com/live-view/",
    "https://docs.lightfunnels.com/managing-contacts/",
    "https://docs.lightfunnels.com/contact-segments/",
    "https://docs.lightfunnels.com/general-settings/",
    "https://docs.lightfunnels.com/funnels/",
    "https://docs.lightfunnels.com/members/",
    "https://docs.lightfunnels.com/tracking/",
    "https://docs.lightfunnels.com/legal-pages/",
    "https://docs.lightfunnels.com/emails/",
    "https://docs.lightfunnels.com/integrations/",
    "https://docs.lightfunnels.com/billing/",
    "https://docs.lightfunnels.com/domains/",
    "https://docs.lightfunnels.com/security-documentation/",
    "https://docs.lightfunnels.com/integrations-flow/",
    "https://docs.lightfunnels.com/zapier/",
    "https://docs.lightfunnels.com/clarity-integration/",
    "https://docs.lightfunnels.com/google-sheet/",
    "https://docs.lightfunnels.com/cart-recovery-app/",
    "https://docs.lightfunnels.com/pabbly-connect-2/",
    "https://docs.lightfunnels.com/noahn3325-gmail-com/",
    "https://docs.lightfunnels.com/shopify-integration/",
    "https://docs.lightfunnels.com/order-email-updates-app/",
    "https://docs.lightfunnels.com/goincognito/",
    "https://docs.lightfunnels.com/facebook-conversion-api-capi/",
    "https://docs.lightfunnels.com/stores/",
    "https://docs.lightfunnels.com/mercadopago-payment-gateway/",
    "https://docs.lightfunnels.com/stripe/",
    "https://docs.lightfunnels.com/cash-on-delivery/",
    "https://docs.lightfunnels.com/paypal/",
    "https://docs.lightfunnels.com/razorpay/",
    "https://docs.lightfunnels.com/cinetpay/",
    "https://docs.lightfunnels.com/checkout-com/",
    "https://docs.lightfunnels.com/square/",
    "https://docs.lightfunnels.com/youcanpay/",
];

// Bearer token
const token = 'Bearer jina_8192df5935b84e62937b1448fe57cbf2suXJSBUR-baF0gj2i0psndD_d6lB';

// Function to make API call for each URL
async function fetchData(url) {
    try {
        const response = await axios.get(`https://r.jina.ai/${url}`, {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
        return null;
    }
}

// Function to save response to a file
function saveToFile(title, urlSource,  markdownContent) {
    // Replace ? with _ in the title
    const sanitizedTitle = title.replace(/\?/g, '_');
    const filename = sanitizedTitle.replace(/\s/g, '_') + '.txt';
    const filePath = path.join(__dirname, filename);
    const content = `Title: ${sanitizedTitle}\n\nURL Source: ${urlSource}\n\nPublished \n\nMarkdown Content:\n${markdownContent}`;
    
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error writing to file ${filename}: ${err}`);
        } else {
            console.log(`File ${filename} saved successfully!`);
        }
    });
}
// Main function to fetch data for each URL and save to file
async function main() {
    for (const url of urls) {
        const response = await fetchData(url);
        if (response) {
            // Extract title, published time, and markdown content from response
            const title = getTitle(response);
            const markdownContent = getMarkdownContent(response);
            saveToFile(title, url,markdownContent);
        }
    }
}

// Example functions to extract data from the response
function getTitle(response) {
    const titleMatch = response.match(/Title: (.*)/);
    return titleMatch ? titleMatch[1] : null;
}

// Example function to extract markdown content from response
function getMarkdownContent(response) {
    const markdownMatch = response.match(/Markdown Content:\n([\s\S]*)/);
    return markdownMatch ? markdownMatch[1] : null;
}

// Run main function
main();




// Get Messages In Conversation 
// var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
// var pageNumber = 1;

// CrispClient.website.listConversations(websiteID, pageNumber);

// List Conversations 

// var websiteID = "8c842203-7ed8-4e29-a608-7cf78a7d2fcc";
// var sessionID = "session_700c65e1-85e2-465a-b9ac-ecb5ec2c9881";
// var timestampBefore = 1641206011000;

// CrispClient.website.getMessagesInConversation(websiteID, sessionID, timestampBefore);