const inquirer = require('inquirer');
const fs = require('fs')
var shell = require('shelljs');
var fse = require('fs-extra');
var archiver = require('archiver');
var os = require('os')

const questions = [
   
    { type: 'input', name: 'target', message: 'Name of the export file', default: 'webli' }

];

module.exports = function () {
    const path = process.cwd() + '/wp-config.php'
    if (fs.existsSync(path)) {
        inquirer
        .prompt(questions)
        .then(function (answers) {
         
           shell.exec('wp db export database.sql', {silent : true, async: false}, function(){
            var output = fs.createWriteStream(os.tmpdir() + `/${answers.target}.zip`);
            var archive = archiver('zip', {
                zlib: { level: 9 }
            });
            
            output.on('close', function () {
                var source = os.tmpdir() + `/${answers.target}.zip`
                var dest = process.cwd() + `/${answers.target}.zip`
                fse.move(source, dest, function (err) {
                    if (err) return console.error(err)
                    console.log("success!")
                   })
                console.log(archive.pointer() + ' total bytes');
                console.log('Export file has been created to' + process.cwd());
            });
            
            archive.on('error', function(err){
                throw err;
            });
            
            archive.pipe(output);
            archive.directory(process.cwd(), false)
            archive.finalize();
           })
           
          
        });
    }
    else{
        console.log('You are not in the wordpress root directory')
    }
    
};

