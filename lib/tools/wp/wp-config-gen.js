const values = require('../tools-value');
const inquirer = require('inquirer');
const shell = require('shelljs')
const fs = require('fs')
const https = require('https');
const replace = require('replace-in-file');
const {linkValidation} = require ('../../validation');

const questions = [
    { type: 'list', name: 'WPconfig', message: 'What do you want to do ?', choices: values.wpConfigTypes },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            const path = process.cwd() + '/wp-config.php'
            if (fs.existsSync(path)) {
                if(answers.WPconfig == 'DB Connect'){
                    inquirer.prompt(debug).then( dans => {
                        switch(dans.debugType){
                            case "Database Name" : inquirer.prompt([{type: 'input', name: 'dbName', message: 'Enter Your Database Name',}]).then(db =>{
                                shell.exec(`wp config set DB_NAME ${db.dbName}`)
                            })
                            break;
                            case "Database User Name" : inquirer.prompt([{type: 'input', name: 'dbUser', message: 'Enter Your Database Username',}]).then(db =>{
                                shell.exec(`wp config set DB_USER ${db.dbUser}`, {silent:true})
                            })
                            break;
                            case "Database Password" : inquirer.prompt([{type: 'input', name: 'dbPass', message: 'Enter Your Database Password',}]).then(db =>{
                                shell.exec(`wp config set DB_PASSWORD ${db.dbPass}`, {silent:true})
                            })
                            break;
                            case "Database Host" : inquirer.prompt([{type: 'input', name: 'dbHost', message: 'Enter Your Database Host',}]).then(db =>{
                                shell.exec(`wp config set DB_HOST ${db.dbHost}`, {silent:true})
                            })
                            break;
                            case "Database Charset" : inquirer.prompt([{type: 'input', name: 'dbChar', message: 'Enter Your Database Charset',}]).then(db =>{
                                shell.exec(`wp config set DB_CHARSET ${db.dbChar}`, {silent:true})
                            })
                            break;
                            case "Database Collate" : inquirer.prompt([{type: 'input', name: 'dbCol', message: 'Enter Your Database Charset',}]).then(db =>{
                                shell.exec(`wp config set DB_COLLATE ${db.dbCol}`, {silent:true})
                            })
                            break;
                        }
                    })
               }
               else if(answers.WPconfig == 'DB Tables'){
                   inquirer.prompt({type:'list', name:"wpPrefix", message: "Select", choices: [{name:"Database Table Prefix"}] }).then(dbPrefix => {
                    switch(dbPrefix.wpPrefix){
                        case "Database Table Prefix" : inquirer.prompt([{type: 'input', name: 'dbPre', message: 'Enter Your Database Table Prefix',}]).then(db =>{
                            shell.exec(`wp config set table_prefix ${db.dbPre}`, {silent:true})
                        })
                        break;
                    }
                   })
               }
               else if(answers.WPconfig == 'Security'){

                inquirer.prompt({type:'list', name:"security", message: "Select", choices: [{name:"Generate Authentication Keys & Salts"}, {name: "Force SSL Login"}, {name: "Force SSL Admin"}] }).then(sec => {
                    switch(sec.security){
                        case "Generate Authentication Keys & Salts" :  const file = fs.createWriteStream("filekey.xml");
                        https.get("https://api.wordpress.org/secret-key/1.1/salt/", function(response) {
                          response.pipe(file);
                          const options = {
                            files: process.cwd() + '/wp-config.php',
                            from: [ /^.*LOGGED_IN_KEY.*$/mg, /^.*AUTH_KEY.*$/mg, /^.*SECURE_AUTH_KEY.*$/mg, /^.*NONCE_KEY.*$/mg, /^.*AUTH_SALT.*$/mg, /^.*SECURE_AUTH_SALT.*$/mg, /^.*LOGGED_IN_SALT.*$/mg,, /^.*NONCE_SALT.*$/mg,],
                            to: ['replaceauth', '', '', '', '', '', '', '', ''],
                          };
                          
                          replace(options, () => {
                             fs.readFile(process.cwd() + '/filekey.xml', 'utf8', function(err, data) {
                                    const opt = {
                                      files: process.cwd() + '/wp-config.php',
                                      from: 'replaceauth',
                                      to: data,
                                    }
                                    replace(opt, () => {
                                        var rf = fs.readFileSync(process.cwd() + '/wp-config.php', 'utf8')
                                        var t = rf.replace(/[\r\n]\s*[\r\n]/g, '\n\n')
                                        fs.writeFile(process.cwd() + '/wp-config.php', t, 'utf8', ()=>{})
        
                                    })
                                  
                                  });
                          })
                        });
                        break;
                        case "Force SSL Login" :inquirer.prompt({type:'confirm', name:'sslLogin', message: 'Enable or Disable SSL Login', default: true}).then(a => {
                            shell.exec(`wp config set FORCE_SSL_LOGIN ${a.sslLogin} --raw`, {silent:true})
                        })
                        break;
                        case "Force SSL Admin" :inquirer.prompt({type:'confirm', name:'sslAdmin', message: 'Enable or Disable SSL Admin', default: true}).then(sa => {
                            shell.exec(`wp config set FORCE_SSL_ADMIN ${sa.sslAdmin} --raw`, {silent:true})
                        })
                        break;
        
                    }
                   })
               }
               else if(answers.WPconfig == 'Address'){
                inquirer.prompt({type:'list', name:"address", message: "Select", choices: [{name:"Set Home and Site URL"}, {name: "Set wp-content URL"}, {name: "Set plugins URL"}, {name: "Set wordpress core files URL"}, {name: "Set uploads folder URL"}, {name: "Set different domain for cookies"}, {name: 'Set wordpress wp-content dir'}] }).then( (add => {
                    switch(add.address){
                        case "Set Home and Site URL" : inquirer.prompt({type: 'input', name: 'site', message: 'Enter your Home and Site URL',validate: linkValidation}).then(s => {
                            shell.exec(`wp config set WP_HOME ${s.site}`, {silent:true})
                            shell.exec(`wp config set WP_SITEURL ${s.site}`, {silent:true})
                        })
                        break;
                        case "Set wp-content URL" : inquirer.prompt({type: 'input', name: 'wpContent', message: 'Enter your wp-content url.',validate: linkValidation}).then(s => {
                            shell.exec(`wp config set WP_CONTENT_URL ${s.wpContent}`, {silent:true})
                        })
                        break;
                        case "Set plugins URL" : inquirer.prompt({type: 'input', name: 'wpplugins', message: 'Enter your wp plugin url.',validate: linkValidation}).then(s => {
                            shell.exec(`wp config set WP_PLUGIN_URL ${s.wpplugins}`, {silent:true})
                        })
                        break;
                        case "Set wordpress wp-content dir" : inquirer.prompt({type: 'input', name: 'wpcont', message: 'Enter your wp-content directory name'}).then(s => {
                            shell.exec(`wp config set WP_CONTENT_DIR ${s.wpcont}`, {silent:true})
                        })
                        break;
                        case "Set uploads folder URL" : inquirer.prompt({type: 'input', name: 'uploads', message: 'Enter your uploads folder url', validate: linkValidation}).then(s => {
                            shell.exec(`wp config set UPLOADS ${s.uploads}`, {silent:true})
                        })
                        break;
                        case "Set different domain for cookies" : inquirer.prompt({type: 'input', name: 'cookie', message: 'Enter your Cookie Domain', validate: linkValidation}).then(s => {
                            shell.exec(`wp config set COOKIE_DOMAIN ${s.cookie}`, {silent:true})
                        })
                    }
                })
                    
                )
               }
              }
              else{
                console.log('You are not in the wordpress root directory')
            }
          
        });
};

const debug = [
    { type: 'list', name: 'debugType', message: 'What do you want to do ?', choices: values.debugTypes },
];


