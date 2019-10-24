const values = require('./tools-value');
const inquirer = require('inquirer');
const imgFileConverter = require('./imgFileConverter')
const imgDirConverter = require('./imgDirConverter')


const questions = [
    { type: 'list', name: 'ipType', message: 'Select your platform', choices: values.ipTypes }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.ipType == 'Converter'){
               inquirer.prompt(question2)
               .then(function(ans){
                    if(ans.fdType == 'File'){
                        imgFileConverter()
                    }
                    else if(ans.fdType == 'Directory'){
                        imgDirConverter()
                    }
               })
             }  
            

        });
};

const question2 = [
    { type: 'list', name: 'fdType', message: 'Select your platform', choices: values.fileDirTypes}
]