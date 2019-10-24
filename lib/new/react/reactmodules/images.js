const values = require('../react-value');
const inquirer = require('inquirer');
const reactModuleGen = require('./moduleIndex')

const questions = [  
    { type: 'rawlist', name: 'imageType', message: 'Select type', choices: values.imageTypes },  
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.imageType === 'react-image-magnifiers'){
                var url = 'https://raw.githubusercontent.com/Manntrix/webli-react-npm-modules/master/Images/webli-react-image-magnifiers.zip'
                pn = answers.imageType
                reactModuleGen(url, pn)
        }
        
        });
};