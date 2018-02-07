//var agentId = "mypizzastore-5d155";
var agentId = "7bf3593b84f04a0ab5eb181336bb704b";

var intentIds = {
    welcome: "af11d205-f8a0-4707-ae2a-4bdd2b17e518",
    "live-agent": "a2c24399-5b00-47c0-85ed-2c862e27443b",
    "help": "003303bb-4b6d-41d8-9a5a-980bc6601d46",

    "cart-add-pizza": "9c70451c-74a0-4bd2-8b5a-7e6d6a1e4902",
    "cart-add-sideorder": "b29b7335-f806-4bae-88a6-4893edb735f7",

    "menu-pizza-list": "62074980-df5f-4247-a9dc-1e74031fdc2d",
    "menu-sideorder-list": "24b1dd93-797e-4852-bb65-dc3a90e62733",
    "menu-beverage-list": "e5dbf815-1489-4d90-b75f-764bb7cc5f7a",


    "cart-pizza-ask-extra-cheese": "c22a0202-7e75-4c1c-9869-81066094c246",
    "cart-pizza-ask-crust": "f6403c9b-66fa-4b8c-a27a-b439b6de5e20",
    "cart-pizza-ask-size": "a8c9722d-0f9c-4889-8a95-2a8d272b7c55",
    "cart-clear": "ea7fd7cb-3e72-455e-b8c4-76ec4c988a26",
    "cart-list": "fc3c271f-c4dc-40f7-b78e-918f43f63377",

    "cart-checkout": "04db1b5e-d4b2-41a5-ac0a-3662fcb1632b",
    "cart-checkout--no": "76988610-a1c3-439e-bd66-abe5c8ef281c",
    "cart-checkout--yes": "a18cde8d-2656-4f33-a131-1e748bff3bc4",

    "order-history": "1374d32b-5b1c-4490-b05b-bd926ae4fbe2",
    "order-status-check": "7e10f851-e48c-4f10-961b-6bec926d6edd",
    "order-reorder": "03713fbc-5a2f-4b08-b4f7-a75a4f188049",

    "store-location": "13885a34-33df-4a0a-98c7-384cb632c4a0",

    "user-order-review": "7275b00c-44a7-4b85-a213-c442c2abcd77",


    "default-fallback": "512d862a-4f0a-4cf3-99fd-37fe78663a33",
    "live-agent-inquiry": "c8cc74cd-1284-4768-bf0d-79e10f74871f",
    "live-agent-inquiry-no": "09835810-2843-450b-b5de-7725ede0a796",
    "live-agent-inquiry-yes": "106da4d6-c94a-4842-b99e-69fd503ba47a"
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function createIntent(id, name) {
    return {
        id: id,
        name: name,
        agentId: agentId
    }
}

function createActions(id, name, context) {
    return {
        id: uuidv4(),
        name: name,
        title: name,
        intentId: id,
        agentId: agentId,
        context: context
    }
}

function createIntentCard(title, intent) {
    return {
        dType: "intentCardData",
        title: title,
        intent: intent,
    };
}

db.agents.deleteMany({ id: agentId });
db.intents.deleteMany({ agentId: agentId });
db.actions.deleteMany({ agentId: agentId });



db.agents.insertMany([
    {
        displayName: "Pizza Assistance",
        "name": "mypizzastore-5d155",
        "id": agentId,
        imageUrls: ["https://s3-ap-southeast-1.amazonaws.com/fx-public-images/bot/fx/bot_mascott_fx_1.svg",
            "https://s3-ap-southeast-1.amazonaws.com/fx-public-images/bot/domino/bot_mascott_dom_4.svg",
            "https://s3-ap-southeast-1.amazonaws.com/fx-public-images/bot/domino/bot_mascott_dom_2.svg"],
        backgroundImage: "https://ollies.ca/wp-content/uploads/2016/01/Ollies-Pizza-Background-3.png",
        isUseVersionTwo: true,
        isEnableLocation: true,
    }
]);

db.intents.insertMany([

    createIntent(intentIds["live-agent"], "live-agent"),
    createIntent(intentIds["help"], "help"),

    createIntent(intentIds["cart-add-pizza"], "cart-add-pizza"),
    createIntent(intentIds["cart-add-sideorder"], "cart-add-sideorder"),


    createIntent(intentIds["menu-pizza-list"], "menu-pizza-list"),
    createIntent(intentIds["menu-sideorder-list"], "menu-sideorder-list"),
    createIntent(intentIds["menu-beverage-list"], "menu-beverage-list"),

    createIntent(intentIds["cart-pizza-ask-extra-cheese"], "cart-pizza-ask-extra-cheese"),
    createIntent(intentIds["cart-pizza-ask-crust"], "cart-pizza-ask-crust"),
    createIntent(intentIds["cart-pizza-ask-size"], "cart-pizza-ask-size"),
    createIntent(intentIds["cart-clear"], "cart-clear"),
    createIntent(intentIds["cart-list"], "cart-list"),
    createIntent(intentIds["cart-checkout"], "cart-checkout"),
    createIntent(intentIds["cart-checkout--no"], "cart-checkout--no"),
    createIntent(intentIds["cart-checkout--yes"], "cart-checkout--yes"),

    createIntent(intentIds["order-history"], "order-history"),
    createIntent(intentIds["order-status-check"], "order-status-check"),
    createIntent(intentIds["order-reorder"], "order-reorder"),

    createIntent(intentIds["store-location"], "store-location"),

    createIntent(intentIds["user-order-review"], "user-order-review"),
    createIntent(intentIds["default-fallback"], "default-fallback"),
    createIntent(intentIds["live-agent-inquiry"], "live-agent-inquiry"),
    createIntent(intentIds["live-agent-inquiry-no"], "live-agent-inquiry-no"),
    createIntent(intentIds["live-agent-inquiry-yes"], "live-agent-inquiry-yes"),
]);

db.actions.insertMany([
    createActions(intentIds["live-agent"],
        "zendesk widget",
        {
            dType: "zendeskCustomerChatSupportAction",
            zendeskWidgetUrl: "https://v2.zopim.com/?5SoKsdaFAf7vvbDjOKCLYBpT1Ia24V5H",
            avatarUrl: "https://i.imgur.com/hHi3tsu.png"
        }),
    createActions(intentIds.help,
        "fall back intent suggestions",
        {
            dType: "cardResponseAction",
            cardLayout: { dType: "templateCardLayoutConfig", template: "textOnly" },
            data: [
                createIntentCard("Order Pizza", "cart-add-pizza"),
                createIntentCard("Order status", "order-status-check"),
                createIntentCard("Talk to Live Agent", "live-agent"),
            ]
        }),

    createActions(intentIds["cart-add-pizza"],
        "Check pizza selection options",
        {
            dType: "functionResponseAction",
            isWebhookOnly: true,
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/cart/fufillment/add-cart-item",
        }),

    createActions(intentIds["cart-add-sideorder"],
        "Check pizza selection options",
        {
            dType: "functionResponseAction",
            isWebhookOnly: true,
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/cart/fufillment/add-cart-sideorder",
        }),

    createActions(intentIds["menu-pizza-list"],
        "Check pizza selection options",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/pizza/fufillment",
        }),

    createActions(intentIds["cart-checkout"],
        "Check pizza before checkout",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/cart/fufillment/cart-details",
        }),

    createActions(intentIds["cart-checkout"],
        "Action buttons",
        {
            dType: "cardResponseAction",
            cardLayout: { dType: "templateCardLayoutConfig", template: "textOnly" },
            data: [
                createIntentCard("Yes, Check out now. 👍", "cart-checkout--yes"),
                createIntentCard("No 👎", "cart-checkout--no"),
            ]
        }),

    createActions(intentIds["cart-checkout--yes"],
        "Yes check out pizza",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/cart/fufillment/check-out",
        }),

    //createActions(intentIds["cart-checkout--yes"],
    //    "Send to kitchen",
    //    {
    //        dType: "functionResponseAction",
    //        url: "http://47.88.175.8:8008",
    //        header: { "X-SDC-APPLICATION-ID": "8ca483c5-ca2c-4c5a-8246-4cb2ebae0a5b" }
    //    }),

    createActions(intentIds["cart-checkout--no"],
        "No check out pizza",
        {
            dType: "eventTriggerAction",
            event: "WELCOME",
        }),

    createActions(intentIds["order-history"],
        "Order history",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/order/fufillment/order-history",
        }),

    createActions(intentIds["order-status-check"],
        "Order history",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/order/fufillment/order-status",
        }),

    createActions(intentIds["order-reorder"],
        "Reorder",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/order/fufillment/reorder",
        }),
    createActions(intentIds["menu-sideorder-list"],
        "Check pizza selection options",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/sideorder/fufillment",
        }),
    createActions(intentIds["menu-beverage-list"],
        "Check pizza selection options",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/beverage/fufillment",
        }),
    createActions(intentIds["cart-pizza-ask-extra-cheese"],
        "Do you want some cheese?",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/pizza-cheese/fufillment",
        }),
    createActions(intentIds["cart-pizza-ask-crust"],
        "Check pizza selection options",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/pizza-crust/fufillment",
        }),
    createActions(intentIds["cart-pizza-ask-size"],
        "Check pizza selection options",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/pizza-size/fufillment",
        }),
    createActions(intentIds["cart-clear"],
        "Clear Cart",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/cart/fufillment/clear-cart",
        }),

    createActions(intentIds["cart-list"],
        "Cart List",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/cart/fufillment/cart-details",
        }),
    createActions(intentIds["cart-list"],
        "Followup suggestions",
        {
            dType: "cardResponseAction",
            cardLayout: { dType: "templateCardLayoutConfig", template: "textOnly" },
            data: [
                createIntentCard("Check out", "cart-checkout"),
                createIntentCard("Clear cart", "cart-clear"),
            ]
        }),


    createActions(intentIds["cart-list"],
        "Cart List - Promotion",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/cart/fufillment/cart-details-promotion",
        }),



    createActions(intentIds["store-location"],
        "Store follow up order",
        {
            dType: "cardResponseAction",
            cardLayout: { dType: "templateCardLayoutConfig", template: "textOnly" },
            data: [
                createIntentCard("Order Pizza", "cart-add-pizza"),
            ]
        }),

    createActions(intentIds["store-location"],
        "Goolge map view composition",
        {
            dType: "googleMapDirection",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/dominos/nearest/fufillment",
            googleDirectionApiKey: "AIzaSyBN4UxgCu9CydX_H_C4TCsnob5npE7VZpM",
        }),


    createActions(intentIds["user-order-review"],
        "Survey Monkey form",
        {
            "dType": "surveyMonkeyAction",
            "surveyUrl": "tRaiETqnLgj758hTBazgd7zg2emoAr_2FocIZTRcfRmZfpIO9Wde98djTn5EIlAmrE"
        }),

    createActions(intentIds["default-fallback"],
        "Default fallback",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/fufillment/default-fallback",
        }),


    createActions(intentIds["live-agent-inquiry"],
        "Action button",
        {
            dType: "cardResponseAction",
            cardLayout: { dType: "templateCardLayoutConfig", template: "textOnly" },
            data: [
                createIntentCard("Yes 👍", "live-agent-inquiry-yes"),
                createIntentCard("No 👎", "live-agent-inquiry-no"),
            ]
        }),


    createActions(intentIds["live-agent-inquiry-no"],
        "Go to help",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/fufillment/live-agent-inquiry-no",
        }),
    createActions(intentIds["live-agent-inquiry-yes"],
        "Go to live agent support",
        {
            dType: "functionResponseAction",
            url: "https://pizzaservice-demo.fusionexgiant.com/api/store/fufillment/live-agent-inquiry-yes",
        }),

]);