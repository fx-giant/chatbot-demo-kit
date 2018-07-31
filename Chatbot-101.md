This guide will assist on setting up the giant integrations

## Getting Started
These instructions will assist you on getting a chat bot configuration up and runnig.

This guide will NOT guide on HOW TO DEVELOP a chat bot. It is meant for people who wants to configure an preexisting chat bot to be further enhance using giant suit of features and integrations point.

> This guide is best follow when the user already have a business use case in mind, or an preexisting IVR like chat bot configurations. whom want to further enrich their responses.

## Prerequisite:
- Has basic knowledge of how dialog flow works
- Wants to actually get things done, and not just for fun
- Has access to all the required software where applicable (Giant Conversation Flow, Facebook, Google/Dialogflow, and Genesys**)
- At least author level of dialogflow (generation of security keys)

> Genesys is not a required component unless there is a use case for live agent chat




## Dialogflow Setup
- Create a new dialogflow Agent OR use an preexisiting dialogflow 
> any integration within and existing dialogflow will be replaced. BACKUP! If needed.

- Setup Dialogflow JSON KEY. Follow this [link](https://dialogflow.com/docs/reference/v2-auth-setup) on setting up a new key. Keep this key on a local folder. we will be upload this key to giant on later stage of agent creation.

> Pro tip: name the service account "giant-dialogflow" for easier maintenance/identification

> Pro tip: if youre not administrator of the given agent, you might not be able to do that. Ask your administrator for help on this.


## Giant Chatbot Agent Setup
- Login to giant, and access conversation flow through "MyForms

TODO: insert image

- Create new Agent by selecting "Create New Agent" "Click to Add"
- Fill in AgentId. AgentId can be acquired from Dialogflow page 
- Dialogflow Credentials - Upload the JSON KEY that was previous generated
- Ensure that crendetial is validated successfully by displaying the two ticks

TODO: insert image

- Proceed to fill the rest of the details.


## Dialogflow integrations
- Open Giant, and select the Agent
- Copy "**Dialogflow Webhook Url**" within the Settings tab
- Select "ACCESS TOKENS" page
- Generate an **access token** (and save this access token somewhere)
- Open DiaglowFlow Web console
- Select Fulfillment on the left panel
- Enable Webhook
- Paste previously copied "**Dialogflow Webhook Url**" into "Url*" text field
- Append the below configuration into Headers "authorization", "Bearer <**access token**>"
> Paste previous copied access token WITHOUT "<" and ">"
- Click Save

## Facebook Integrations

### Setting up Facebook Agent and Subscriptions

- Open Giant, and select the Agent
- Copy "**Facebook webhook url**" within the Settings tab
- Open facebook developer page
- Select the App that we will be hooking up to
- Select Webhook on the left panel
- Paste the copied facebookWebhookurl on to the callback url
> The url has to be concatinated with this strucutre {**facebook_webhookurl**}?a={**accessToken**}
> example results https://chat-api.fusionexgiant.com/api/v2/Agent/1234ID/Facebook/Webhook?a=MY-ACCESS-TOKEN


- Select Messenger Tab on the left
- Move to "Webhooks"
- Subscribe for the selected page with Messagers and messaging_postbacks

- Move to "Token Generation"
- Select the page base on previous subscription
- Copy "Page Access Token"
> For ease of explanation. FacebookToken will be used to descript this copied token


### Setting up Giant 
- Open Giant, and select the Agent
- Paste the "FacebookToken" onto the Settings page and save
> This allow giant to interact with your users through facebook by using the provided token.

### Setting up Dialogflow
- Open Dialogflow Web console
- Select Integrations on the left panel
- Toggle on Facebook Messenger
- Paste the "FacebookToken" onto Page Access Token

> This enables dialogflow facebook webhook. allowing giant to proxy certain calls towards this api when needed. Such as basic FAQ use cases.

> This allow dialogflow to interact with your users through facebook by using the provided token.

Once all the above steps is completed. You may proceed to your facebook page and test around, where giant would intercept any call through facebook, and be seen LOGGED into the Chat Reports tab.

IF IT DOESNT WORK.... Revisit the above step. OR CRY FOR HELP.


## Genesys Integrations
- Append a gensys url into Giant
- Ensure a given intent is configured with "customerChatSupportAction"
