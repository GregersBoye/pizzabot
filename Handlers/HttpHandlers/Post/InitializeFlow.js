class InitializeFlow {
    constructor(request, response, slack) {
        this.request = request;
        this.response = response;
        this.slack = slack;

        const channelId = this.request.body.channel_id;

        this.slack.getChannelInfo(channelId).then((result) => {

            //TODO: enqueue all calls with q.all()
            result.members.forEach((member) => {

                const data = {
                    "text": "Det er pizzatid!",
                    attachments: [
                        {


                            "text": "Skal du have pizza?",
                            "fallback": "Vælg en pizza manuelt",
                            "callback_id": "pizza_opt_in",
                            "color": "#3AA3E3",
                            "attachment_type": "default",
                            "actions": [
                                {
                                    "name": "pizza",
                                    "text": "Ja tak",
                                    "type": "button",
                                    "value": "true"
                                },
                                {
                                    "name": "pizza",
                                    "text": "Nej tak",
                                    "type": "button",
                                    "value": "false",
                                    "confirm": {
                                        "title": "Er du sikker?",
                                        "text": "Pizza er rigtig godt!",
                                        "ok_text": "Ja",
                                        "dismiss_text": "Nej"
                                    }
                                }
                            ]

                        }
                    ]
                };

                slack.sendEphemereal(member, channelId, data).then((result) => {
                    console.log("we got respose");
                }).catch((error) => {

                });
            });


        }).catch((error) => {
            console.log('An error occurred');
            console.log(error);
        });
    }
}

module.exports = InitializeFlow;