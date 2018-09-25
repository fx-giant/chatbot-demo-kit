This guide will assist on setting up bank simulator.
Show casing a authenticated flow for bank application

Scroll to bottom for simple guide on how to develop your own bank simulator api

## Getting Started
These instruction will assist you on getting bank simulator up and running.

This guide will assume there is already an accessible ava environment

## Prerequisite
- An existing Ava deployed enviroment
- Access to Diaglogflow bank project (bank-demo-a605f)

## Run Dependencies 
- Run Docker image  gcr.io/dialogflow-rnd/chat-banking-simulator-node:1.0.15
> being mapped to https://chat-banking-simulator.fusionexgiant.com
> No other configuration can be made. its all in memory
> Reset this docker process to ensure cash flow is being resetted

- Run Docker image  gcr.io/dialogflow-rnd/chat-banking-web:1.0.5
> being mapped to https://chat-banking-web.fusionexgiant.com
> No other configuration its being hard wired to use official chat-web.fusionexgiant.
> Pro tip: if you want to do alteration. Alter program.js and rebuild the image. Its a file system serve usig nginx


## Using the system
- The system by defaults loginto as demouser1
- Input "My Bank account"
- Ensure a html page is being shown


## Authentication Fail Step
- Open https://chat-web.fusionexgiant.com/#/9ab49e2514a44d008716aaac4de6da04?t=daafcb329a8d86690bffa5f55d1652762889f6064b17ec0ab85e51a21c20bb0f538bdc2604ec4b6985b8bb1f19c2b7d6&et=deed9363-aec8-4d5e-b9f0-7a045026b851 
- Type "My Bank Account"
- Ensure that "Unauthroized" is being shown


## Implementation
chat-banking-simulator-node is being develop to show case how we can bridge and existing api over to dialogflow with some basic oauth implementation

### Authentication
- An that generates a temporary token
```javascript
//Method: POST
//Request: NOT required
//Response
{
  token: { 
    type: String,
    required: true
  }
}
```
- Claim Token. Generating a JWT by handing a temporary generated token. Required authenticated **service account** for converting a token to a JWT

```javascript
//Method: POST
//Request
{
  token: { 
    type: String,
    required: true
  }
}
//Response: STRING (valid JWT)
```

### Sample Webhook structure
Request and response structure for webhook. Where the wrapper business logic handle most of the transpiling.

```javascript
//METHOD: POST
//Request
{
  session:{
    type: String,
    description: "shorten guid of sessionid from dialogflow"
  },
  parameters:{
    type: Object,
    description: "parameters configured in html page OR pass in from dialogflow"
    nullable: false,
    can_be_empty: true
  },
  outputContexts:{
    type: Array<Dialogflow.OutputContext>,
    description: "dialogflow output contenxt",
    nullable: true,
    can_be_empty: true
  }
}
//Response
{
  text:{
    type: String,
    optional: true,
    description: "A simple plain text to be displayed to user"
  },
  event:{
    type: String,
    optional: true
  },
  complexResponses:{
    type: Array<ResponseEnrichmentAction>,
    optional: true,
    description: "Use this response when you want to have complex responeses, to view a list of supported object. make use of the user interface on what are the objects can be created. Use web inspector to preview the actual structure",
    possible_known_type: [
      "buttonResponseAction",
      "cardResponseAction",
      "functionResponseV2Action",
      "htmlFormAction",
    ]
  }
}
```

