const values = require('./html-value');
const inquirer = require('inquirer');
const adminCat = require('./demos/admin-cat')
const portfolioCat = require('./demos/portfolio-cat')
const questions = [   
    { type: 'list', name: 'listcat', message: 'Select the category',  choices: values.htmlCategory}  ,
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
           if(answers.listcat == 'Admin'){
               adminCat()
           }
           else if(answers.listcat == 'Portfolio'){
               portfolioCat()
           }
        });
}; 