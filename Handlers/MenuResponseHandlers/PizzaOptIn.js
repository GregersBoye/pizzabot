const Menu = require('./../../Menu');
const Slack = require('./../../Wrapper/Slack');

class PizzaOptIn {
    constructor(userList) {
        this.userList = userList;
    }

    handleRequest(request, choiceList) {
        const user = this.userList.find((user) => {
            return user.id === request.user.id
        });

        const existingChoiceIndex = choiceList.findIndex((choice) => {
            return choice.user === user.name;
        });

        if (request.actions[0].value === 'false') {
            console.log(`${user.name} does not want pizza`);

            if(existingChoiceIndex !== -1){
                choiceList.splice(existingChoiceIndex, 1);
            }

            return {list: choiceList, response: "Fair nok"};
        }

        const slack = new Slack();

        const choice = {
            user: user.name,
            choice: null
        };

        if (existingChoiceIndex === -1) {
            choiceList.push(choice);
        } else {
            choiceList[existingChoiceIndex] = choice;
        }

        this.getPizzaMessage()
            .then((messageData) => {
                return slack.sendEphemereal(request.user.id, request.channel.id, messageData)
            })
            .then((result) => {
                console.log("we got response");
            })
            .catch((error) => {

            });

        return {list: choiceList, response: "Super"};
    }

    getPizzaMessage() {
        return Menu.getMenu().then((menu) => {

            const menuOptions = menu.map((category) => {
                const dishList = category.dishes.map((dish) => {
                    return {
                        text: `${dish.dish} - kr. ${dish.price}`,
                        value: dish.dish
                    }
                });
                return {
                    'text': category.category,
                    'options': dishList
                }
            });

            return {
                "text": "Så skal du vælge hvad du vil ha! Du kan skifte din bestilling ved at vælge noget nyt",
                "response_type": "in_channel",
                "attachments": [
                    {
                        "text": "Vælg en pizza el.",
                        "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
                        "color": "#3AA3E3",
                        "attachment_type": "default",
                        "callback_id": "dish_selected",
                        "actions": [
                            {
                                "name": "Pappas menu",
                                "text": "Vælg en ret",
                                "type": "select",
                                "option_groups": menuOptions
                            }
                        ]
                    }
                ]
            }

        })
    }
}

module.exports = PizzaOptIn;