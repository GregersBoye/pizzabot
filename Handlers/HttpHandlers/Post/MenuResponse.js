const PizzaOptIn = require('./../../MenuResponseHandlers/PizzaOptIn');
const CategorySelection = require('./../../MenuResponseHandlers/CategorySelection');
const DishSelection = require('./../../MenuResponseHandlers/DishSelection');


class MenuResponse {
    constructor(request, response, slack) {
        this.request = request;
        this.response = response;
        this.slack = slack;

        const payload = JSON.parse(this.request.body.payload);
console.log(payload);
        new this.responseHandlers[payload.callback_id](payload);

    }

    get responseHandlers() {
        return {
            pizza_opt_in: PizzaOptIn,
            category_selected: CategorySelection,
            dish_selected: DishSelection
        }
    }
}


module.exports = MenuResponse;