const { parse } = require('node-html-parser');

const fs = require('fs');


class Parser{
    constructor(){
        let menu = {};

        this.html = fs.readFileSync('menu.html', 'utf8');
        const root = parse(this.html);
        const categories = root.querySelectorAll('.menuCard-category');

        categories.forEach((category) => {
            const currentCategory =category.attributes['data-test-id']
            menu[currentCategory] = [];
            const items = category.querySelectorAll('.menu-product');

            items.forEach((item) => {

                let dish = item.querySelector('.product-title').removeWhitespace().rawText;
                let price= item.querySelector('.product-price').removeWhitespace().rawText;

                const pattern = /kr\. (\d*),\d{2}/
                price = price.replace(pattern, '$1');
                let isLunchOffer = false;

                if(dish.charAt(0) === '*'){
                    price = 39;
                    dish = dish.substr(2);
                    isLunchOffer = true;
                }
                menu[currentCategory].push({
                    dish: dish,
                    price: parseInt(price),
                    isLunchOffer: isLunchOffer
                })

            })
        });

        console.log(menu);
        fs.writeFile('./menu.json', JSON.stringify(menu), (error) => {
            if(error){
                console.log("An error occurred")
            }else{
                console.log("menu was written to file");
            }
        });
    }
}

module.exports = Parser;