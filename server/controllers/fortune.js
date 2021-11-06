const fortunes = require('../../db/fortune.json');
const Fortune = require('../../models/fortune.js');

module.exports = {
    getFortune: (req, res) => {
        let index = Math.floor(Math.random() * Fortune.all.length);
        let fortune = Fortune.all[index];
        res.status(200).send(fortune.text);
    },
    genFortunes: (req, res) => {
        if (Fortune.all.length === 0) {
            fortunes.forEach(fortune => new Fortune(fortune.text));
        }
        if (fortunes) {
            res.status(200).send(Fortune.all);
        } else {
            res.status(500).send("Error generating fortunes.")
        }
    },
    createFortune: (req, res) => {
        let text = req.body.text;
        let newFortune = new Fortune(text);
        let target = Fortune.all.find(f => f.text === text);
        let index = Fortune.all.indexOf(target);
        let fObj = {
            index: index,
            text: newFortune.text
        };
        res.status(200).send(fObj);
    },
    deleteFortune: (req, res) => {
        let index = req.params.index;
        Fortune.delete(index);
        res.status(200).send(index);
    },
    updateFortune: (req, res) => {
        let { index, text } = req.body;
        let target = Fortune.all[+index];
        target.text = text;
        let fObj = {
            index: index,
            text: target.text
        };
        res.status(200).send(fObj);
    }
}