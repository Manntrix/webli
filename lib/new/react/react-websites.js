const values = require('./react-value');
const inquirer = require('inquirer');
const adminWeb = require('./demos/react-admin')
const portfolioGen = require('./demos/portfolio')
const landingGen = require('./demos/landingPage')


const questions = [  
    { type: 'list', name: 'webType', message: 'Select type', choices: values.websiteTypes },  
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.webType === 'Portfolio'){
                portfolioGen()
        }
        else if (answers.webType === 'Landing Page'){
            landingGen()
        }
        else if (answers.webType === 'Admin'){
            adminWeb ()
        }
        });
};