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
1. **Ava** Main logical processing handling all user chats, and webhook fufillment
2. **Ulthane** Main storage storing all agents, intent and actions configurations
3. **Logging** Logs, need i explain more
4. **Genesys Proxy** *optional* Used for ferring comunication within chat interface and genesys services. Background task and message pooling are some of its role. Thus its important to scale this as genesys user scale as well.
5. **Facebook Session** *optional* Used to keep track of a given fresh new facebook conversation


## Installation (Form)
1. **Pull down the relevant web forms**
2. **Upload to giant**
> The given forms deployment only provide sample configuration. do the necessary changes onto the configuration
> If a given enviroment is on premis, it is suggested to download the scripts and repackage instead. (Changes on your part is required) 

### Form Program Configuration
1. **Ulthane**
- requiredAuth *default: false* always. since it uses giant as authentication
- applicationTitle *default Conversation flow 2.0
- baseUrl ulthane service url. 
> If form uses giant proxy mode, this can be disregarded
- chatWebUrl a *SELF HOSTED* ava web
- chatUrl ava url mainly used for display purpose (on agent detail page). NOT FOR INVOCATION

2. **Ava**
- isDebug *default: true* toggle to false if all error wanted to be suppress
- avaUrl 
> Protip: *If its in self hosted mode, consider proxying ava web to reduce cluter of cors between web and services*

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
- CHAT_LOGS_SOURCE_PROVIDER_TYPE *a valid connection sourc below, currently only supported postgres*
- CHAT_LOGS_CONNECTION_STRING *a valid connection source RELATIVE to logging service below*

>Protip: nodejs connection string are different to .net core. 
for more details on [postgre](https://node-postgres.com/features/connecting#connection-uri), [mongoDb](https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html)

>Protip: for high performance during production, ulthane can be connected to a read only replica of postgre for loggin. while having logging to log to a high read store, having a batch to update back to postgre sql.


3. **Logging** *.net core*
- Docker image service port: 80
- ConnectionString *any valid connection string base on the configured source provider type**
- SourceProviderType *default: Postgre* support for other sql source is COMMING SOON.
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

