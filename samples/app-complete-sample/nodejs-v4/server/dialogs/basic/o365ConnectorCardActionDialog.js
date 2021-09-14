// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
const { CardFactory } = require('botbuilder');
const { WaterfallDialog, ComponentDialog } = require('botbuilder-dialogs');
const O365CONNECTORCARDACTION = 'O365ConnectorCardAction';
class O365ConnectorCardActionDialog extends ComponentDialog {
    constructor(id) {
        super(id);

        // Define the conversation flow using a waterfall model.
        this.addDialog(new WaterfallDialog(O365CONNECTORCARDACTION, [
            this.beginO365ConnectorCardActionDialog.bind(this),
        ]));
    }

    async beginO365ConnectorCardActionDialog(stepContext) {
        var text = stepContext.context._activity.text.trim();
        var inputNumber = text.substr(text.length - 1, 1);
        console.log(inputNumber)
        var reply = stepContext.context._activity;
        var card;
        switch (inputNumber) {
            case "2":
                card = this.O365ActionableCardMultipleSection();
                break;
            case "":
                default:
                card = this.O365ActionableCardDefault();
                break;
        }

        reply.attachments = [card];
        await stepContext.context.sendActivity(reply);
        return await stepContext.endDialog();
    }

    O365ActionableCardDefault = () => {

        var card = CardFactory.o365ConnectorCard({
            "themeColor": "#E67A9E",
            "title": "card title",
            "text": "card text",
            "summary": "O365 card summary",
            "sections": [
                {
                    "title": "**section title**",
                    "text": "section text",
                    "activityTitle": "activity title",
                    "activitySubtitle": "activity subtitle",
                    "activityText": "activity text",
                    "activityImageType": null,
                    "markdown": true,
                    "activityImage": "http://connectorsdemo.azurewebsites.net/images/MSC12_Oscar_002.jpg",
                    "facts": [
                        {
                            "name": "Fact name 1",
                            "value": "Fact value 1"
                        },
                        {
                            "name": "Fact name 2",
                            "value": "Fact value 2"
                        }
                    ],
                    "images": [
                        {
                            "image": "http://connectorsdemo.azurewebsites.net/images/MicrosoftSurface_024_Cafe_OH-06315_VS_R1c.jpg",
                            "title": "image 1"
                        },
                        {
                            "image": "http://connectorsdemo.azurewebsites.net/images/WIN12_Scene_01.jpg",
                            "title": "image 2"
                        }, {
                            "image": "http://connectorsdemo.azurewebsites.net/images/WIN12_Anthony_02.jpg",
                            "title": "image 3"
                        }
                    ]
                }
            ],
            "potentialAction": [
                {
                    "type": "ActionCard",
                    "name": "Multiple Choice",
                    "id": "Multiple Choice Card",
                    "inputs":
                        [
                            {
                                "type": "multichoiceInput",
                                "id": "cardstype",
                                "isRequired": true,
                                "title": "Pick multiple options",
                                "value": null,
                                "Choices":
                                    [
                                        {
                                            "disply": "Hero Card",
                                            "value": "Hero Card"
                                        },
                                        {
                                            "disply": "Hero Card",
                                            "value": "Thumbnail Card"
                                        },
                                        {
                                            "disply": "O365 Connector Card",
                                            "value": "O365 Connector Card"
                                        }],

                                "style": "expanded",
                                "isMultiSelect": true
                            },
                            {
                                "type": "multichoiceInput",
                                "id": "Teams",
                                "isRequired": true,
                                "title": "Pick multiple options",
                                "value": null,
                                "Choices":
                                    [
                                        {
                                            "disply": "Bot",
                                            "value": "Bot"
                                        },
                                        {
                                            "disply": "Tab",
                                            "value": "Tab"
                                        },
                                        {
                                            "disply": "Connector",
                                            "value": "Connector"
                                        },
                                        {
                                            "disply": "Compose Extension",
                                            "value": "Compose Extension"
                                        }
                                    ],

                                "style": "compact",
                                "isMultiSelect": true
                            },
                            {
                                "type": "multichoiceInput",
                                "id": "Apps",
                                "isRequired": true,
                                "title": "Pick an App",
                                "value": null,
                                "Choices":
                                    [
                                        {
                                            "disply": "VSTS",
                                            "value": "VSTS"
                                        },
                                        {
                                            "disply": "Wiki",
                                            "value": "Wiki"
                                        },
                                        {
                                            "disply": "Github",
                                            "value": "Github"
                                        }],

                                "style": "expanded",
                                "isMultiSelect": false
                            }, {
                                "type": "multichoiceInput",
                                "id": "OfficeProduct",
                                "isRequired": true,
                                "title": "Pick an Office Product",
                                "value": null,
                                "Choices":
                                    [
                                        {
                                            "disply": "Outlook ",
                                            "value": "Outlook"
                                        },
                                        {
                                            "disply": "MS Teams",
                                            "value": "MS Teams"
                                        },
                                        {
                                            "disply": "Skype",
                                            "value": "Skype"
                                        }],

                                "style": "compact",
                                "isMultiSelect": false
                            }
                        ],
                    "actions": [
                        {
                            "typr": "HttpPOST",
                            "name": "send",
                            "id": "multichoice",
                            "body": {
                                "cardstype": "{{cardstype.value}}",
                                "Teams": "{{Teams.value}}",
                                "Apps": "{{Apps.value}}", "OfficeProduct": "{{OfficeProduct.value}}"
                            }
                        }
                    ]

                },
                {
                    "type": "ActionCard",
                    "id": "text Input",
                    "name": "Input Card",
                    // text input control with multiline
                    "inputs":
                        [
                            {
                                "type": "TextInput",
                                "id": "text-1",
                                "isRequired": false,
                                "title": "multiline, no maxLength",
                                "value": null,
                                "isMultiline": true,
                                "maxLength": null
                            },
                            {
                                "type": "TextInput",
                                "id": "text-2",
                                "isRequired": false,
                                "title": "single line, no maxLength",
                                "value": null,
                                "isMultiline": false,
                                "maxLength": null
                            },
                            {
                                "type": "TextInput",
                                "id": "text-3",
                                "isRequired": false,
                                "title": "multiline, max len = 10, isRequired",
                                "value": null,
                                "isMultiline": true,
                                "maxLength": 10
                            }, {
                                "type": "TextInput",
                                "id": "text-4",
                                "isRequired": false,
                                "title": "single line, max len = 10, isRequired",
                                "value": null,
                                "isMultiline": false,
                                "maxLength": null
                            }],
                    "actions": [
                        {
                            "type": "HttpPost",
                            "name": "Send",
                            "id": "inputText",
                            "body": {
                                "text1": "{{text-1.value}}",
                                "text2": "{{text-2.value}}",
                                "text3": "{{text-3.value}}",
                                "text4": "{{text-4.value}}"
                            }
                        }
                    ]
                },
                {
                    "type": "ActionCard",
                    "name": "Date Input",
                    "id": "Date Card",
                    "inputs":
                        [
                            {
                                "type": "DateInput",
                                "id": "date-1",
                                "isRequired": true,
                                "title": "date with time",
                                "value": null,
                                "includeTime": true
                            },
                            {
                                "type": "DateInput",
                                "id": "date-2",
                                "isRequired": false,
                                "title": "date only",
                                "value": null,
                                "includeTime": false
                            }
                        ],
                    "actions": [
                        {
                            "type": "HttpPost",
                            "name": "send",
                            "id": "dateInput",
                            "body": { "date1": "{{date-1.value}}", "date2": "{{date-2.value}}" }
                        }
                    ]

                },
                {
                    "type": "ViewAction",
                    "name": "Open Uri",
                    "id": "open Uri",
                    "targets": [{
                        "os": "default",
                        "uri": "http://microsoft.com"
                    },
                    {
                        "os": "iOS",
                        "uri": "http://microsoft.com"
                    }, {
                        "os": "android",
                        "uri": "http://microsoft.com"
                    },
                    {
                        "os": "windows",
                        "uri": "http://microsoft.com"
                    }]
                },
                {
                    "type": "ViewAction",
                    "name": "View Action",
                    "id": null,
                    "target": ["http://microsoft.com"]
                }
            ]
        });
        return card;
    }

    O365ActionableCardMultipleSection = () => {

        return CardFactory.o365ConnectorCard({
            "themeColor": "#E67A9E",
            "title": "This is Actionable Card Title",
            "summary": "O365 card summary",
            "sections": [
                {
                    "title": "Section Title 1",
                    "text": "",
                },
                {
                    "title": "Section Title 2",
                }
            ],
            "potentialAction": [
                {
                    "type": "ActionCard",
                    "name": "Multiple Choice",
                    "id": "Multiple Choice Card",
                    "inputs":
                        [
                            {
                                "type": "multichoiceInput",
                                "id": "cardstype",
                                "isRequired": true,
                                "title": "Pick multiple options",
                                "value": null,
                                "Choices":
                                    [
                                        {
                                            "disply": "Hero Card",
                                            "value": "Hero Card"
                                        },
                                        {
                                            "disply": "Hero Card",
                                            "value": "Thumbnail Card"
                                        },
                                        {
                                            "disply": "O365 Connector Card",
                                            "value": "O365 Connector Card"
                                        }],

                                "style": "compact",
                                "isMultiSelect": true
                            }
                        ],
                    "actions": [
                        {
                            "type": "HttpPOSTS",
                            "name": "send",
                            "id": "multichoice",
                            "body": { "cardstype": "{{cardstype.value}}" }
                        }
                    ]

                },
                {
                    "type": "ActionCard",
                    "id": "text Input",
                    "name": "Input Card",
                    // text input control with multiline
                    "inputs":
                        [
                            {
                                "type": "TExtInput",
                                "id": "text-1",
                                "isRequired": false,
                                "title": "This is the title of text box",
                                "value": null,
                                "isMultiline": true,
                                "maxLength": null
                            }],
                    "actions": [
                        {
                            "type": "HttpPOSTS",
                            "name": "Send",
                            "id": "inputText",
                            "body": { "text1": "{{text-1.value}}" }
                        }
                    ]
                },
                {
                    "type": "ActionCard",
                    "name": "Multiple Choice",
                    "id": "Multiple Choice Card",
                    "inputs":
                        [
                            {
                                "type": "multichoiceInput",
                                "id": "CardsTypesection1",
                                "isRequired": true,
                                "title": "This is a title of combo box",
                                "value": null,
                                "Choices":
                                    [
                                        {
                                            "disply": "Hero Card",
                                            "value": "Hero Card"
                                        },
                                        {
                                            "disply": "Hero Card",
                                            "value": "Thumbnail Card"
                                        },
                                        {
                                            "disply": "O365 Connector Card",
                                            "value": "O365 Connector Card"
                                        }],

                                "style": "compact",
                                "isMultiSelect": true
                            }
                        ],
                    "actions": [
                        {
                            "type": "HttpPOSTS",
                            "name": "send",
                            "id": "multichoice",
                            "body": { "CardsTypesection1": "{{CardsTypesection1.value}}" }
                        }
                    ]
                }
            ]
        });
    }
}

exports.O365ConnectorCardActionDialog = O365ConnectorCardActionDialog;