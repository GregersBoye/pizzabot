const { parse } = require('node-html-parser');

const fs = require('fs');


class Parser{
    constructor(){
        this.html = fs.readFileSync('menu.html', 'utf8');
        const root = parse(this.html);
        const categories = root.querySelectorAll('.menuCard-category');

        categories.forEach((category) => {
            console.log(category.attributes['data-test-id']);
            const items = category.querySelectorAll('.menu-product');
            items.forEach((item) => {
                const dish = item.querySelector('.product-title').removeWhitespace().rawText
                const price= item.querySelector('.product-price').removeWhitespace().rawText
                console.log("\t"+ dish +": "+ price);
            })
        });

    }
}

module.exports = Parser;