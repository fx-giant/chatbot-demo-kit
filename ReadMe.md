# Chatbot demo kit
A simple chat bot system that show case basic interaction flow with dialogflow.


## Getting Started
These instructions will assist you on getting a chat bot system demo kit up and running.
Its mean for using inconjunction with Giant and dialog flow.

This guide will not cover atremdes user interface and services, nor cover the basic of 
dialog. Please refer to their respective guides on it.



### Prerequisite:
- Has access to chatbot container registry
- Has access to a version of giant with atremedes forms install
- Has a working knowledge of dialog flow


### Service Explanation
Here are the brief explanation of each docker file configuration and usages.

1. **Ava.core** contains application engine and demo user interface that is accessible via ~/Chat rout
2. **Ava.Logger** simple logging application that would lost all conversation onto a given postgre
3. **Atramedes** chatbot engine follow up action configuration. Provide ava core with a list of actions to invoke 
base on current agent, intent and/or event. Expose basic interface for CRUD operation 
4. **telco-check-date-func** demo telco check date function. 

### Installation (Self Docker)
1. **Pull down the required docker images**
```bash
docker pull gcr.io/fx-chatbot-170907/ava-core:1.0
docker pull gcr.io/fx-chatbot-170907/ava-logger-node:1.0
docker pull gcr.io/fx-chatbot-170907/fx-atramedes:1.0.0
docker pull gcr.io/fx-chatbot-170907/telco-check-date-func:latest
```

2. **Run Atramedes**
```bash
docker run -d -p 8800:15417 gcr.io/fx-chatbot-170907/fx-atramedes:1.0.0 --name atramedes \
        -e PORT=15417 \
        -e MONGO_HOST=35.185.188.120 \
        -e MONGO_DATABASE=Chat \
        -e MONGO_USERNAME=chat-root \
        -e MONGO_PASSWORD=chat-123-root-123 \
        -e BEAUTIFY_RESPONSE=false
```
3. **Run Logging**
```bash
docker run gcr.io/fx-chatbot-170907/ava-logger-node:1.0 \
    -d -p 8801:80  --name ava-core  \
    -e AtramedesUrl=localhost:8800  \
    -e LoggingUrl=localhost:8801
```

4. **Run Ava Core**
```bash
docker run gcr.io/fx-chatbot-170907/ava-core:1.0 \
    -d -p 8800:80  --name ava-core  \    
    -e LOGGER_POSTGRES_HOST=localhost \
    -e LOGGER_POSTGRES_DB=chatbot \
    -e LOGGER_POSTGRES_USER=postgres \
    -e LOGGER_POSTGRES_PASSWORD=Password!@#$ \
    -e LOGGER_POSTGRES_PORT=5432 
```



### Installation (Docker compose)
1. git pull the docker docker
```bash
//git pull command
```

2. docker up
```bash
//git pull command
```