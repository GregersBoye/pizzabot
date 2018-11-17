var request = require('request-promise-native');
var qs = require('query-string');

class Slack {
    constructor() {
        this.baseUrl = 'https://slack.com/api';
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


    /**
     *
     * @param member_id
     * @param menu
     * @param channel_id

     */
    sendEphemereal(member_id, channel_id, data) {

        const path = 'chat.postEphemeral';

        if(typeof data.attachments !== "undefined" && typeof data.attachments !== "string") {
            data.attachments = JSON.stringify(data.attachments);
        }

        data.channel = channel_id;
        data.user =  member_id;

        return this.sendPost(data, path);
    }


    sendPost(data, path) {

        data.token = this.token;
        const url = `${this.baseUrl}/${path}`;
        return request.post(url).form(data).then((result) => {
            result = JSON.parse(result);
            if (!result.ok) {
                return Promise.reject(`An error occurred in sendport, pasth: ${config.path}: ${response.error}`);
            }

            return Promise.resolve(result);
        });

    }

    /**
     * send a request and returns a promise with the result
     *
     * @return {Promise.<TResult>}
     * @param config
     */
    sendGet(config) {
        const data = `${this.baseUrl}/${config.path}?` + qs.stringify(config.params);

        return request.get(data).then((response) => {

            response = JSON.parse(response);
            console.log(response)

            if (!response.ok) {
                console.log(response);
                return Promise.reject("An error occurred");
            }

            return Promise.resolve(response.channel);
        }).catch((error) => {
            console.log(error);
        });
    }


}

module.exports = Slack;