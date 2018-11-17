const InitializeFlow = require('./../Handlers/HttpHandlers/Post/InitializeFlow');
const http = require('http');
const Slack = require('./../Wrapper/Slack');
class HttpListener {
    constructor(app, port) {

        this.slack = new Slack();
        this.setupListeners(app, port);
    }

    setupListeners(app, port) {

        app.listen(port,  () => {
            return console.log("Listening to port " + port + "!");
        });

        app.post('/initializeFlow', (request, response) => {
            new InitializeFlow(request, response, this.slack);

        });

        app.post('/test', (request, response) => {
            console.log(request);
        })
    }
}

module.exports = HttpListener;









