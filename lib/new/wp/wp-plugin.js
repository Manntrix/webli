
const inquirer = require('inquirer');
const os = require('os')
var Git = require("simple-git/promise")
const ora = require('../../oraconfig')
var shell = require('shelljs');
var glob = require("glob")
const fs = require('fs')

const questions = [   
    { type: 'input', name: 'pluginName', message: 'Plugin Name',  } ,
    { type: 'input', name: 'pluginslug', message: 'Plugin slug',  } ,
    { type: 'input', name: 'pluginUri', message: 'Plugin URI', default: 'http://example.com' } ,
    { type: 'input', name: 'description', message: 'Plugin Description'} ,
    { type: 'input', name: 'author', message: 'Author Name'} ,
    { type: 'input', name: 'authorUri', message: 'Author URI'} ,

];



module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            pn = answers.pluginName
            ps = answers.pluginslug
            url = 'https://github.com/Manntrix/WP-Plugin-Boilerplate.git'
            Git().clone(url, ps, {}, ora.generating.start()).then(function () {
                ora.generating.succeed(); 
                glob(process.cwd() + `/${ps}/**/?(*|*-)plugin-name*.*`, {}, function (er, files) {

                    for(i=0; i<files.length; i++){
                       
                        var data = fs.readFileSync(files[i], 'utf8')
                        var find = ["Plugin-Name", "Plugin_Name", "PLUGIN_NAME", "plugin-name", "plugin_name", 'plugin-uri', 'descrition_here', 'author_name', 'author_uri'];
                        var pnU = ps.toUpperCase()
                        var replace = [pn, ps, pnU, ps, ps, answers.pluginUri, answers.description, answers.author, answers.authorUri];
                        var result = data.replace(new RegExp("(" + find.map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return replace[find.indexOf(s)]});

                        fs.writeFileSync(files[i], result, 'utf8')


                        fs.renameSync(files[i] , files[i].replace('plugin-name', ps), function (err) {
                            if (err) throw err;
                          });
                          
                    }
                    shell.cd(answers.pluginslug)
                    shell.rm('-rf', '.git');
               })

              

            }).catch(function (err) {
                ora.generating.fail()
               console.log(err)
            })
            
        });
};