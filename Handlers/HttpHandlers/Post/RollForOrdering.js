const Slack = require('../../../Wrapper/Slack');

class RollForOrdering{
    constructor(userList){
        this.slack = new Slack();
        this.userList = userList;
    }

    roll(request, choiceList){
        const channel_id =request.channel.id;

        let highRoller = {roll:0};
        let latestOrderer= {time: moment(0)};

        choiceList.filter((choice) => {
           return choice.name !== 'torbenph';
        }).forEach((choice) => {
            choice.roll = (Math.random()*20) +1;
            if (choice.roll > highRoller.roll){
                highRoller = choice;
            }

            if(choice.time > latestOrderer.time){
                latestOrderer = choice;
            }
        });




        this.slack.sendMessage()
    }
}

module.exports = RollForOrdering;