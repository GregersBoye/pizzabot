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

                    attachments:[
                        {
                            "text": "Choose a game to play",
                            "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
                            "color": "#3AA3E3",
                            "attachment_type": "default",
                            "callback_id": "game_selection",
                            "actions": [
                                {
                                    "name": "games_list",
                                    "text": "Pick a game...",
                                    "type": "select",
                                    "options": [
                                        {
                                            "text": "Hearts",
                                            "value": "hearts"
                                        },
                                        {
                                            "text": "Bridge",
                                            "value": "bridge"
                                        },
                                        {
                                            "text": "Checkers",
                                            "value": "checkers"
                                        },
                                        {
                                            "text": "Chess",
                                            "value": "chess"
                                        },
                                        {
                                            "text": "Poker",
                                            "value": "poker"
                                        },
                                        {
                                            "text": "Falken's Maze",
                                            "value": "maze"
                                        },
                                        {
                                            "text": "Global Thermonuclear War",
                                            "value": "war"
                                        }
                                    ]
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