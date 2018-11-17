class InitializeFlow{
    constructor(request, response, slack){
        this.request = request;
        this.response = response;
        this.slack = slack;

        const channelId = this.request.body.channel_id;

        this.slack.getChannelInfo(channelId).then((result) => {

        }).catch((error) => {
            console.log('An error occurred');
            console.log(error);
        });
    }
}

module.exports = InitializeFlow;