const InitializeFlow = require('./../Handlers/HttpHandlers/Post/InitializeFlow');
const MenuResponse = require('./../Handlers/HttpHandlers/Post/MenuResponse');

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

        app.post('/pizzaResponse', (request, response) => {
            new MenuResponse(request, response, this.slack);

        })
    }
}

module.exports = HttpListener;









