# Chatbot demo kit
A complementary service to run dominos chat bot 


## Getting Started
These instructions will assist you on getting a store front running with a dominos base chat bot


### Prerequisite:
- Has a running access of chatbot version  (version >= 2.1)
- Has a running access of logging version  (version >= 2.0)
- Has a running presta shot with dominos item configured (https://mypizzastore.foryoubiz.com)
- Has a working knowledge of dialog flow
- Has a working knowledge of presta shop and auth key generation
- A working mongoDb (for simple store data storage)

### Service Explanation
Here are the brief explanation of each docker file configuration and usages.

1. **Prestashop** a store front for cms capabilities
2. **SimpleStore** an api service for chat bot to interface with



### Installation (Self Docker)
1. **Pull down the required docker images**
```bash
docker pull gcr.io/fx-giant-container/ava-core:2.1
docker pull gcr.io/fx-giant-container/ava-logger-node:2.0
#Remainder ava-core deployment
docker pull gcr.io/fx-giant-container/ava-simplestore-node:1.0
```

2. **Run ava core**
Review existing ava core deployment on how to deploy.

3. **Run logging**
Review existing ava core deployment on how to deploy.

3. **Run simple store**
```bash
docker run -d \
    --expose 3000:3000 \    
    -e PRESTASHOP_URL=https://mypizzastore.foryoubiz.com \
    -e PRESTASHOP_AUTH_KEY=WCD35FE8PM6MNAAH1HV332VS6TYE2MSP \
    -e PRESTASHOP_MYSQL_URL=mysql://dbuser:kZg@3av7tK@47.74.234.42:3306/eshop \        
    -e STORE_MONGODB_URL=mongodb://my-root:my-root-pwd@35.198.200.243:27017/simpleStore?authSource=admin \
    -e STORE_TYPE=prestashop \
    gcr.io/fx-giant-container/ava-simplestore-node:1.0  \
    --name ava-simple-store
```
> PRESTASHOP_MYSQL_URL represents the storage of given prestashop url
> 
> STORE_TYPE hard code to prestashop for this demo instance


## Configure Agent
1. Ensure you have a running ava-core
2. Execute "mongo-insert-mypizzastore-intents.js"
> Within the intent all service mapping currently is being mapped to https://pizzaservice-demo.fusionexgiant.com/
> 
> If the given service deployment uses a different dns, alter the patch script locally and execute it.


## Suggested Domain mapping
| Service | Url |
|---|---|
|**ava core** | https://pizzabot-demo.fusionexgiant.com |
|**simple store** | https://pizzaservice-demo.fusionexgiant.com |
|**ava logger** | https://pizzalog-demo.fusionexgiant.com/ |