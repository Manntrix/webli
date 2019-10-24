const values = require('./wp-value');
const inquirer = require('inquirer');
const businessCat = require('./demos/business')
const constructionCat = require('./demos/construction')
const resturantCat = require('./demos/resturant')
const educationCat = require('./demos/education')


const questions = [
    { type: 'list', name: 'WPDemoCat', message: 'Select Category', choices: values.WPDemoCats },  
    
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            
            if(answers.WPDemoCat === 'Business' ){
                businessCat()
               
            }
            else if(answers.WPDemoCat === 'Construction'){
                constructionCat()
            }
            else if(answers.WPDemoCat === 'Blog'){
                
            }
            else if(answers.WPDemoCat === 'Resturant'){
                resturantCat()
            }
            else if(answers.WPDemoCat === 'Education'){
                educationCat()
            }
        });
};