<!-- # Chatbot demo kit -->
A simple chat bot system that show case basic interaction flow with dialogflow.

## Getting Started
These instructions will assist you on getting a chat bot system demo kit up and running.
Its mean for using inconjunction with Giant and dialog flow.

This guide will not cover atremdes user interface and services, nor cover the basic of 
dialog. Please refer to their respective guides on it.

## Prerequisite:
- Has access to chatbot container registry
- Has access to a version of giant with atremedes forms install
- Has a working knowledge of dialog flow

## Service Explanation
Refer to Ai Components visio for each component relationship
1. **Ava** Main logical processing handling all user chats, and webhook fulfillment
2. **Ulthane** Main storage storing all agents, intent and actions configurations
3. **Logging** All given chat logs
4. **Genesys Proxy** *optional* Used for ferrying communication within chat interface and genesys services. Background task and message pooling are some of its role. Thus, it’s important to scale this as genesys user scale as well.
5. **Facebook Session** *optional* Used to keep track of a given fresh new facebook conversation

## Installation (Form)
1. **Pull down the relevant web forms**
2. **Upload to giant**
> The given forms deployment only provides sample configuration. do the necessary changes onto the configuration
> If a given environment is on premise, it is suggested to download the scripts and repackage instead. (Changes on your part is required) 

### Form Program Configuration
1. **Ulthane**
- requiredAuth *default: false* always. since it uses giant as authentication
- applicationTitle *default Conversation flow 2.0
- baseUrl ulthane service url. 
> If form uses giant proxy mode, this can be disregarded
- chatWebUrl a *SELF HOSTED* ava web
- chatUrl ava url mainly used for display purpose (on agent detail page). NOT FOR INVOCATION

2. **Ava**
- isDebug *default: true* toggle to false if all error wanted to be suppressed
- avaUrl 
> Protip: *If it’s in self hosted mode, consider proxying ava web to reduce cluter of cors between web and services*

---

## Installation (Self Docker)
1. **Pull down the required docker images**
2. **Run the required docuker images**

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
- DATABASE *given databas within mongo*
- CHAT_LOGS_SOURCE_PROVIDER_TYPE *a valid connection sourc below, currently supported **Postgres** & MySql*
- CHAT_LOGS_CONNECTION_STRING *a valid connection source RELATIVE to logging service below*

>Protip: nodejs connection string are different to .net core. 
for more details on [postgre](https://node-postgres.com/features/connecting#connection-uri), [mongoDb](https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html)

>Protip: for high performance during production, ulthane can be connected to a read only replica of postgre for loggin. while having logging to log to a high read store, having a batch to update back to postgre sql.

> **Database preparation**: remember to execute /scripts/ava-mongo to initialize the mongo database structure

3. **Logging** *.net core*
- Docker image service port: 80
- ConnectionString *any valid connection string base on the configured source provider type**
- SourceProviderType *default: Postgre* & MySql
- EventBus* 
- EventBusQueuename *default: Logging*, ensure that changes to this queue is 

4. **Genesys Proxy** *.net core*
- ConnectionString redis url [see more on security for redis](https://redis.io/topics/security)
- EventBus* 
- EventBusQueuename *default: Logging*, ensure that changes to this queue is 

5. **Facebook Session** *.net core*
- FacebookApiUrl *default: https://graph.facebook.com/v2.6/me/*
- ConnectionString redis url [see more on security for redis](https://redis.io/topics/security)
- EventBus* 
- EventBusQueuename *default: Logging*, ensure that changes to this queue is 

### MISC Configuration Properties
1. EventBus*: RabbitMQ configuration
- HostName
- Port
- Username
- Passowrd
- RetryCount
> *Protip*: for nested .net core docker enviroment pass through use {P}:{C} format [See more...](https://www.scottbrady91.com/Docker/ASPNET-Core-and-Docker-Environment-Variables)

---

## Giant Configurations

In order to fully utilize form, there are a few prerequisite setups to be done before hand. This section the assumption is made that you have gone through at least the basic of giant administration training, and contain at least a power administrator level account.
`
### Role Setup
- Client Administrator: default role existed within the system. user who has been granted this role will gain **FULL ACCESS** to all of the features available within the system. Handling the administration task such as setting up new chatbot, security, and integration token access.
- Power Admin: default role existed within the system. Same access rights as Client Administrator above. 
- Chat Content Editor: an assigned role where the given user mainly performs the task of DESIGNIN the chat bot responses. Given to user whom are the business specialist that defines the responses of each given intent.

- Chat Operator: an assigned role where the given user is allowed access to view chat history for monitoring purpose.





