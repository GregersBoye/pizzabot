const PizzaOptIn = require('./../../MenuResponseHandlers/PizzaOptIn');
const DishSelection = require('./../../MenuResponseHandlers/DishSelection');


class MenuResponse {
    constructor(slack, choiceList, userList) {
        this.choiceList = choiceList;
        this.pizzaOptin = new PizzaOptIn(userList);
        this.dishSelection = new DishSelection(userList);

        this.userList = userList;

        this.slack = slack;
    }

    handleRequest(request, response){
        const payload = JSON.parse(request.body.payload);

        response = this.responseHandlers[payload.callback_id].handleRequest(payload, this.choiceList);
        this.choiceList = response.list;


        return response;

    }

    get responseHandlers() {
        return {
            pizza_opt_in: this.pizzaOptin,
            dish_selected: this.dishSelection,
            roll_for_ordering: this.rollForOrdering
        }
    }
}


module.exports = MenuResponse;