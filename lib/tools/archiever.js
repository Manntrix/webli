const values = require('./tools-value');
const inquirer = require('inquirer');
var file_system = require('fs');
var fs = require('fs-extra');
var archiver = require('archiver');
var os = require('os')
const path = require('path')
inquirer.registerPrompt('directory', require('inquirer-select-directory'));

const questions = [
    { type: 'list', name: 'archieveType', message: 'Select your platform', choices: values.archieveTypes },
    { type: 'directory', name: 'from', message: 'Source folder', basePath: process.cwd() },
    { type: 'input', name: 'target', message: 'Enter your archieve name', default: 'webli' }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.archieveType == 'zip'){
                var pathName = answers.from.split(path.sep).pop()
                var archive = archiver('zip', {
                    zlib: { level: 9 }
                });
                var output = file_system.createWriteStream(os.tmpdir() + `/${answers.target}.zip`);
                archive.directory(answers.from, pathName) 
                archive.pipe(output);
                
                output.on('close', function () {
                    var source = os.tmpdir() + `/${answers.target}.zip`
                    var dest = process.cwd() + `/${answers.target}.zip`
                    fs.move(source, dest, function (err) {
                        if (err) return console.error(err)
                        console.log("success!")
                       })
                    console.log(archive.pointer() + ' total bytes');
                    console.log('archiver has been finalized and the output file descriptor has closed.');
                });
                
                archive.on('error', function(err){
                    throw err;
                });
                archive.finalize();
             }  
             else if (answers.archieveType == 'tar'){
                var pathName = answers.from.split(path.sep).pop()
                var output = file_system.createWriteStream(`${answers.target}.tar`);
                var archive = archiver('tar');   
                output.on('close', function () {
                    console.log(archive.pointer() + ' total bytes');
                    console.log('archiver has been finalized and the output file descriptor has closed.');
                });
                archive.on('error', function(err){
                    throw err;
                }); 
                archive.pipe(output);
                archive.directory(answers.from, pathName)
                archive.finalize();
             }
             else if (answers.archieveType == 'gzip'){
                 var pathName = answers.from.split(path.sep).pop()
                var output = file_system.createWriteStream(`${answers.target}.tar.gz`);
                var archive = archiver('tar', {
                    gzip: true,
                gzipOptions: {
                    level: 9
                }});
                
                output.on('close', function () {
                    console.log(archive.pointer() + ' total bytes');
                    console.log('archiver has been finalized and the output file descriptor has closed.');
                });
                
                archive.on('error', function(err){
                    throw err;
                });
                
                archive.pipe(output);
                archive.directory(answers.from, false)
                archive.finalize();
             }
        });
};