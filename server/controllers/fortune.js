const fortunes = require('../../db/fortune.json');
const Fortune = require('../../models/fortune');

module.exports = {
    getFortune: (req, res) => {
        let totalFortunes = fortunes.length + Fortune.all.length;
        let random = Math.floor(Math.random() * totalFortunes);
        res.status(200).send("You've received a fortune")
    },
    genFortunes: (req, res) => {
        res.status(200).send("Fortunes generated");
    }
}