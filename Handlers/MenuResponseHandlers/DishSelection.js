const Slack = require('./../../Wrapper/Slack');
const moment = require('moment');

class DishSelection {
    constructor(userList) {

        this.userList = userList;
        this.messageId = null;
        this.slack = new Slack();

    }

    handleRequest(request, choiceList) {
        const user = this.userList.find((user) => {
            return user.id === request.user.id
        });

        const existingChoiceIndex = choiceList.findIndex((choice) => {
            return choice.user === user.name;
        });

        const choice = {
            user: user.name,
            time: moment(),
            choice: request.actions[0].selected_options[0].value
        };

        if (existingChoiceIndex === -1) {
            choiceList.push(choice);
        } else {
            choiceList[existingChoiceIndex] = choice;
        }

        this
            .sendChoice(choiceList, request.channel.id)
            .then((response) => {
                this.messageId = response.ts;
            });

        return {list: choiceList, response:""};
    }


    sendChoice(choiceList, channelId) {
        if (choiceList.length === 0) {
            return Promise.reject('No choices were made');
        }

        let items = {};
        let fields = [];

        choiceList.forEach((choice) => {
            if(choice.choice === null){
                return;
            }

            if (typeof items[choice.choice] === 'undefined') {
                items[choice.choice] = []
            }

            items[choice.choice].push(choice.user);

        });

        for (const key in items) {
            let item = items[key];

            fields.push({
                title: `${key} (x${item.length})`,
                value: this.convertToString(item),
                short: false
            });
        }

        const data = {
            text: "Der er valgt følgende retter:",
            attachments: [
                {
                    fields: fields,
                }
            ]
        };


        return this.slack
            .sendMessage(channelId, data, this.messageId)
            .then((response) => {
                return response;
            });


    }

    convertToString(itemList) {
        if (itemList.length === 1) {
            return itemList[0];
        }

        const lastItem = itemList.pop();

        let itemString = itemList.split(', ');
        itemString = `${itemString} og ${lastItem}`;

        return itemString;
    }

}

module.exports = DishSelection;