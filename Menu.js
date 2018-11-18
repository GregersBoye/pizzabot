const {promisify} = require('util');

const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

class Menu {
    static getMenu() {

        return readFileAsync('./menu.json', 'utf8').then((data) => {
            return JSON.parse(data);
        }).catch((error) => {

        });
    }

}

module.exports = Menu;