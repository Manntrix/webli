const values = require('../html-value');
const inquirer = require('inquirer');
const {htmlGen} = require('../../gitconfig')
const questions = [   
    { type: 'rawlist', name: 'admincat', message: 'Select the category',  choices: values.adminCategory}  ,
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
           if(answers.admincat == 'AdminLTE - ColorlibHQ'){
               link = 'https://github.com/ColorlibHQ/AdminLTE.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'material-dashboard - creativetimofficial'){
               link = 'https://github.com/creativetimofficial/material-dashboard.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'startbootstrap-sb-admin-2 - BlackrockDigital'){
               link = 'https://github.com/BlackrockDigital/startbootstrap-sb-admin-2.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'ace - bopoda'){
               link = 'https://github.com/bopoda/ace.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'Bootstrap-Admin-Template - puikinsh'){
               link = 'https://github.com/puikinsh/Bootstrap-Admin-Template.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'AdminBSBMaterialDesign - gurayyarar'){
               link = 'https://github.com/gurayyarar/AdminBSBMaterialDesign.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'startbootstrap-sb-admin - BlackrockDigital'){
               link = 'https://github.com/BlackrockDigital/startbootstrap-sb-admin.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'Bootstrap-Admin-Theme - VinceG'){
               link = 'https://github.com/VinceG/Bootstrap-Admin-Theme.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'devoops - nnmware'){
               link = 'https://github.com/nnmware/devoops.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'shards-dashboard - DesignRevision'){
               link = 'https://github.com/DesignRevision/shards-dashboard.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'sufee-admin-dashboard - puikinsh'){
               link = 'https://github.com/puikinsh/sufee-admin-dashboard.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'Bootstrap-Admin-Theme-3 - VinceG'){
               link = 'https://github.com/VinceG/Bootstrap-Admin-Theme-3.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
           else if(answers.admincat == 'CoolAdmin - puikinsh'){
               link = 'https://github.com/puikinsh/CoolAdmin.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
        });
}; 