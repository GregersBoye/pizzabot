const Slack = require('../../../Wrapper/Slack');
const moment = require('moment');

class RollForOrdering {
    constructor(userList) {
        this.slack = new Slack();
        this.userList = userList;
    }

    roll(request, choiceList) {
        console.log(choiceList);
        const channel_id = request.body.channel_id;

        let lowRoller = {roll: 1000000};
        let latestOrderer = {time: moment(0)};

        const resultList = choiceList
            .filter((choice) => {
                return choice.name !== 'torbenph';
            })
            .map((choice) => {
                choice.roll = Math.ceil((Math.random() * 200) + 1);
                if (choice.roll < lowRoller.roll) {
                    lowRoller = choice;
                }

                if (choice.time > latestOrderer.time) {
                    latestOrderer = choice;
                }

                return choice;
            })


        const rollList = [];
        const latestList = [];
        resultList
            .forEach((choice) => {
                rollList.push({
                    title: choice.user,
                    value: choice.roll
                });

                latestList.push({
                    title: choice.user,
                    value: choice.time.format('HH:mm:ss')
                });

            });


        const data = {
            text: "@here Der er følgende resultater:",
            attachments: [
                {

                    pretext: `Det er ${lowRoller.user} der skal bestille:`,
                    fields: rollList
                },
                {
                    pretext: `Det er ${latestOrderer.user} der skal gå ned med bakkerne:`,
                    fields: latestList
                }
            ]
        };


        return this.slack.sendMessage(channel_id, data).then((result) => {
            return true;
        });
    }
}

module.exports = RollForOrdering;