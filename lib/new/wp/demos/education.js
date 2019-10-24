const wpDemoGen = require('./demosIndex')
const values = require('../wp-value');
const inquirer = require('inquirer');

const questions = [
    { type: 'list', name: 'edu', message: 'Select website demo', choices: values.educationCat },  
    
];


module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            
            if(answers.edu === 'Zakra Education - ThemeGrill' ){
                var url = 'https://raw.githubusercontent.com/Manntrix/Webli-WP-Sites/master/Education/ZakraEducation-ThemeGrill.zip'
                wpDemoGen(url)
               
            }
          
        });
};