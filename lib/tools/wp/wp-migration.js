const values = require('../tools-value');
const inquirer = require('inquirer');
const wpImport = require('./wp-import')
const wpExport = require('./wp-export')


const questions = [
    { type: 'list', name: 'MigrateType', message: 'Do you want to import or export site ?', choices: values.MigrationTypes },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.MigrateType == 'Import a site'){
                wpImport()
             } 
             else if (answers.MigrateType == 'Export a site') {
                wpExport()
             }
            
          
        });
};