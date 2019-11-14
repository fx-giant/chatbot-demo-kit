<!-- # Chatbot demo kit -->
A simple chat bot system that show case basic interaction flow with Dialogflow.

## Getting Started
These instructions will assist you on getting a chat bot system demo kit up and running.
It is meant for using in conjunction with GIANT and Dialogflow.

This guide does not cover atremedes user interface and services, nor cover the basics of 
Dialogflow. Please refer to their respective guides on it.

## Prerequisites:
- Has access to chatbot container registry
- Has access to a version of GIANT with atremedes forms installed
- Has a working knowledge of Dialogflow

## Service Explanation
Refer to Ai Components visio for each component relationship
1. **Ava** Main logical processing handling all user chats and webhook fulfillment
2. **Ulthane** Main storage storing all agents, intents and actions configurations
3. **Logging** All given chat logs
4. **Genesys Proxy** *(optional)* Used for ferrying communication within chat interface and genesys services. Background tasks and message pooling are some of its role. Thus, it’s important to scale this as genesys user scale as well.
5. **Facebook Session** *(optional)* Used to keep track of a given fresh new Facebook conversation

## Installation (Form)
1. **Pull down the relevant web forms**
2. **Upload to GIANT**
> The given forms deployment only provides sample configuration. Do the necessary changes onto the configuration
> If a given environment is on premise, it is suggested to download the scripts and repackage instead (Changes on your part is required) 

### Form Program Configuration
1. **Ulthane**
- requiredAuth *default: false* always. Since it uses GIANT as authentication
- applicationTitle *default Conversation flow 2.0
- baseUrl ulthane service url. 
> If form uses GIANT proxy mode, this can be disregarded
- chatWebUrl a *SELF HOSTED* ava web
- chatUrl ava url mainly used for display purpose (on agent detail page). NOT FOR INVOCATION

2. **Ava**
- isDebug *default: true* toggle to false if all error wanted to be suppressed
- avaUrl 
> Protip: *If it’s in self-hosted mode, consider proxying ava web to reduce clutter of CORS between web and services*

---

## Installation (Self Docker)
1. **Pull down the required docker images**
2. **Run the required docker images**

### Docker Configurations
1. **Ava** *.net core*
- Docker image service port: 80
- UlthaneUrl
- FacebookUserSessionServiceUrl
- EventBus* 
- EventBusQueuename *default: AvaApi*, ensure that changes to this queue is applied to all ava container for consistency 
> *Protip*: curl to ~/api/Configuration to view the current instances configurations. Works for all services developed by aeym.
 

2. **Ulthane** *nodejs*
- PORT *default: 1337*
- MONGODB_URL *any valid mongodb will be accepted*
- DATABASE *given database within mongo*
- CHAT_LOGS_SOURCE_PROVIDER_TYPE *a valid connection source below, currently supported **Postgre** & MySql*
- CHAT_LOGS_CONNECTION_STRING *a valid connection source RELATIVE to logging service below*

>Protip: nodejs connection string are different to .net core. 
Click for more details on [postgres](https://node-postgres.com/features/connecting#connection-uri), [mongoDb](https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html)

>Protip: For high performance during production, ulthane can be connected to a read-only replica of postgres for logging, while having logging to log to a high read store, having a batch to update back to postgreSQL.

> **Database preparation**: remember to execute /scripts/ava-mongo to initialize the mongo database structure

3. **Logging** *.net core*
- Docker image service port: 80
- ConnectionString *any valid connection string based on the configured source provider type**
- SourceProviderType *default: Postgre* & MySql
- EventBus* 
- EventBusQueuename *default: Logging*, ensure that changes to this queue is the same as all configurations

4. **Genesys Proxy** *.net core*
- ConnectionString redis url [see more on security for redis](https://redis.io/topics/security)
- EventBus* 
- EventBusQueuename *default: GenesysProxy*, ensure that changes to this queue is the same as all configurations

5. **Facebook Session** *.net core*
- FacebookApiUrl *default: https://graph.facebook.com/v2.6/me/*
- ConnectionString redis url [see more on security for redis](https://redis.io/topics/security)
- EventBus* 
- EventBusQueuename *default: FacebookSessionApi*, ensure that changes to this queue is the same as all configurations

6. **Whatsapp Session** 
- ConnectionString redis url [see more on security for redis](https://redis.io/topics/security)
- EventBus* 
- EventBusQueuename *default: WhatsappSessionApi*, ensure that changes to this queue is the same as all configurations

### MISC Configuration Properties
1. EventBus*: RabbitMQ configuration
- HostName
- Port
- Username
- Password
- RetryCount
> *Protip*: For nested .net core docker enviroment pass through, use {P}:{C} format [See more...](https://www.scottbrady91.com/Docker/ASPNET-Core-and-Docker-Environment-Variables)
> *Protip*: For environment that not accept colon ":" for value key, may replace the ":" with double underscore "\_\_".

---

## GIANT Configurations

In order to fully utilize form, there are a few prerequisite setups to be done beforehand. For this section, the assumption is made that you have gone through at least the basic of GIANT administration training and you have at least a Power Administrator level account.

### Role Setup
- Client Administrator: default role that exists within the system. User who has been granted this role will gain **FULL ACCESS** to all of the features available within the system. Handling the administration tasks such as setting up a new chatbot, security and integration token access.
- Power Admin: default role that exists within the system. Same access rights as Client Administrator above. 
- Chat Content Editor: an assigned role whereby the given user mainly performs the task of DESIGNING the chat bot responses. Given to users whom are the business specialists that define the responses of each given intent.

- Chat Operator: an assigned role whereby the given user is allowed access to view the chat history for monitoring purpose.
