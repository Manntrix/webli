const values = require('./default-value');
const inquirer = require('inquirer');
const reactGen = require('./react/react-gen')
const WPGen = require('./wp/wp-gen')
const htmlGen = require('./html/html-gen')

const questions = [
    { type: 'list', name: 'defaultType', message: 'Select your platform', choices: values.webTypes }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.defaultType == 'React'){
                reactGen()
             }  
             else if (answers.defaultType == 'Wordpress'){
                WPGen()
             }
             else if(answers.defaultType == 'HTML'){
                htmlGen()
             }
             
        });
};