const axios = require('axios');
class Slack {
    constructor() {
        this.baseUrl = 'https://slack.com/api/';
        this.token = process.env.API_TOKEN;
}

    /**
     *  Fetches info on a specific slack-channel
     *
     * @param {string} channel_id
     */
    getChannelInfo(channel_id) {
        const config = {
            path: 'channels.info',
            params: {
                token: this.token,
                channel: channel_id,
                pretty: 1
            }

        };

        return this.sendGet(config);
    }

    sendPost(){}

    /**
     * send a request and returns a promise with the result
     *
     * @param {{}config
     * @return {Promise.<TResult>}
     */
    sendGet(config){


        return axios.get(`${this.baseUrl}/${config.path}`, {params: config.params}).then((result) => {
            const response = result.data;

            if(!response.ok){

                return Promise.reject("An error occurred");
            }

            return Promise.resolve(response.channel);
        });
    }
}

module.exports = Slack;