# Chatbot demo kit
A simple chat bot system that show case basic interaction flow with dialogflow.


## Getting Started
These instructions will assist you on getting a chat bot system demo kit up and running.
Its mean for using inconjunction with Giant and dialog flow.

This guide will not cover atramedes user interface and services, nor cover the basic of 
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
base on current agent, intent and/or event. Expose basic interface for CRUD operation.
4. **Atramedes Audit** basic CRUD for auditing user interaction with the bot. 
5. **telco-check-date-func** demo telco check date function. 

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
docker run -d -p 8800:15417 
        -e PORT=15417 \
        -e MONGO_HOST=localhost \
        -e MONGO_DATABASE=Chat \
        -e MONGO_USERNAME=chat-username \
        -e MONGO_PASSWORD=chat-password \
        -e BEAUTIFY_RESPONSE=false \
        gcr.io/fx-chatbot-170907/fx-atramedes:1.0.0 --name atramedes
```

3. **Run Atramedes Audit**
```bash
docker run -d \
    -p 15720:15720 \
    -e PORT=15720 \
    -e MONGO_AUDIT_HOST=localhost \
    -e MONGO_AUDIT_DATABASE=Chat-audit \
    -e MONGO_AUDIT_USERNAME=chat-username \
    -e MONGO_AUDIT_PASSWORD=chat-password \
    -e MONGO_AUDIT_AUTH_SOURCE=admin \
    -e MONGO_AUDIT_COLLECTION=audit \
    -e BEAUTIFY_RESPONSE=false \
    gcr.io/fx-chatbot-170907/fx-atramedes-audit:latest --name atramedes-audit
```

3. **Run Logging**
```bash
docker run gcr.io/fx-chatbot-170907/ava-logger-node:1.0 \
    -d -p 8801:80  --name ava-logger-node:1.0  \		
    -e LOGGER_POSTGRES_HOST=localhost \
    -e LOGGER_POSTGRES_DB=chatbot \
    -e LOGGER_POSTGRES_USER=postgres \
    -e LOGGER_POSTGRES_PASSWORD=Password!@#$ \
    -e LOGGER_POSTGRES_PORT=5432 
```

4. **Run Ava Core**
```bash
docker run gcr.io/fx-chatbot-170907/ava-core:1.0 \
    -d -p 8800:80  --name ava-core  \  
    -e AtramedesUrl=localhost:8800  \
    -e LoggingUrl=localhost:8801
```



### Installation (Docker compose)
1. git pull the docker compose
```bash
# Docker compose [DO NOT USE APT-GET]
curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

# change Permission 
chmod +x /usr/local/bin/docker-compose
```

2. docker up
```bash
docker-compose -f chatbot-demo-kit.yml up -d
```