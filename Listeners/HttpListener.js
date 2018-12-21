const InitializeFlow = require('./../Handlers/HttpHandlers/Post/InitializeFlow');
const MenuResponse = require('./../Handlers/HttpHandlers/Post/MenuResponse');
const RollForOrdering= require('./../Handlers/HttpHandlers/Post/RollForOrdering');

const http = require('http');
const Slack = require('./../Wrapper/Slack');

class HttpListener {
    constructor(app, port, choiceList, userList) {

        this.userList = userList;
        this.slack = new Slack();
        this.setupListeners(app, port);
        this.choiceList = choiceList;
        this.menuResponse = new MenuResponse(this.slack, this.choiceList, this.userList);
        this.rollForOrdering = new RollForOrdering(this.userList);
    }

    setupListeners(app, port) {

        app.listen(port, () => {
            return console.log("Listening to port " + port + "!");
        });

        app.post('/initializeFlow', (request, response) => {
            new InitializeFlow(request, response, this.slack)
                .then((recipients) => {
                    response.send(`Der blev sendt besked til ${recipients} personer i kanalen`);
                });
        });

        app.post('/pizzaResponse', (request, response) => {
            const result = this.menuResponse.handleRequest(request, response);
            response.send(result.response);
            this.choiceList = result.list;
        });

        app.post('/pizzaroll', (request, response) => {
            const result = this.rollForOrdering.roll(request, this.choiceList);

        });

        app.get('/', (request, response) => {
            response.send('this is the pizza-bot answering');
        })
    }
}

module.exports = HttpListener;









