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

        return this.sendGet(config).then((result) => {
            return result.channel;
        });
    }

    getUserList() {
        const config = {
            path: 'users.list',
            params: {
                token: this.token
            }

        };

        return this
            .sendGet(config)
            .then((result) => {

                return result
                    .members
                    .filter((person) => {
                        return !person.is_bot && !person.deleted;
                    })
                    .map((person) => {

                        let name = person.profile.display_name;

                        if (name === "") {
                            name = person.name;
                        }

                        return {
                            id: person.id,
                            name: name
                        }
                    });
                }
            );
    }

    sendMessage(channel_id, data, timestamp = null) {
        let path = 'chat.postMessage';

        if(timestamp !== null){
            path = 'chat.update';
            data.ts = timestamp;
        }


        if (typeof data.attachments !== "undefined" && typeof data.attachments !== "string") {
            data.attachments = JSON.stringify(data.attachments);
        }

        data.channel = channel_id;

        return this.sendPost(data, path);
    }

    /**
     *
     * @param member_id
     * @param channel_id
     * @param data
     */
    sendEphemereal(member_id, channel_id, data) {

        const path = 'chat.postEphemeral';

        if (typeof data.attachments !== "undefined" && typeof data.attachments !== "string") {
            data.attachments = JSON.stringify(data.attachments);
        }

        data.channel = channel_id;
        data.user = member_id;

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
        let data = `${this.baseUrl}/${config.path}`

        if (typeof config.params !== 'undefined') {
            data = `${data}?${qs.stringify(config.params)}`;
        }

        return request.get(data).then((response) => {

            response = JSON.parse(response);


            if (!response.ok) {

                return Promise.reject("An error occurred");
            }

            return Promise.resolve(response);
        }).catch((error) => {
            console.log(error);
        });
    }


}

module.exports = Slack;