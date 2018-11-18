const Menu = require('./../../Menu');
const Slack = require('./../../Wrapper/Slack');

class PizzaOptIn {
    constructor(response) {
        const slack = new Slack();
        const user = response.user.name;

        if (response.actions[0].value === "true") {
            this.getPizzaMessage()
                .then((messageData) => {
                    return slack.sendEphemereal(response.user.id, response.channel.id, messageData)
                })
                .then((result) => {
                    console.log("we got respose");
                })
                .catch((error) => {

                });


        } else {
            console.log(`${user} does not want pizza`);
        }
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
                "text": "Super, nu skal du vælge hvad du vil ha!",
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