This guide will assist on setting up bank simulator.
Show casing a authenticated flow for bank application

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



