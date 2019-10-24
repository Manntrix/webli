const inquirer = require('inquirer');
const sh = require('shelljs')
const fs = require('fs')


const questions = [
    { type: 'list', name: 'mainType', message: 'Activate or Deactivate Maintenance Mode ?', choices:  [{name:'Activate'}, {name: 'Deactivate'}] },
];

module.exports = function () {
    const path = process.cwd() + '/wp-config.php'
    if(fs.existsSync(path)){
        inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.mainType == 'Activate'){
                sh.exec('wp maintenance-mode activate')
             } 
             else if (answers.mainType == 'Deactivate') {
                sh.exec('wp maintenance-mode deactivate')
             }
            
          
        });
    }
    else{
        console.log('You are not inside the wordpress root directory')
    }
    
};