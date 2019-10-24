const values = require('../react-value');
const inquirer = require('inquirer');
const {fileGenearator} = require('../../gitconfig')


const questions = [  
    { type: 'list', name: 'adminType', message: 'Select type', choices: values.adminTypes },  
    { type: 'input', name: 'siteName', message: 'Enter your site name', default: 'webli' }  
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            var sitename = answers.siteName
            if(answers.adminType == 'Ant Design Pro'){
                var link = 'https://github.com/ant-design/ant-design-pro'
                fileGenearator(link, sitename )
            }
            else if(answers.adminType == 'react-admin - marmelab'){
            var link = 'https://github.com/marmelab/react-admin'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'ReactJS-AdminLTE - booleanhunter'){
            var link = 'https://github.com/booleanhunter/ReactJS-AdminLTE'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'Free react-admin - coreui'){
            var link = 'https://github.com/coreui/coreui-free-react-admin-template'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'antd-admin - zuiidea'){
            var link = 'https://github.com/zuiidea/antd-admin.git'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'shards-dashboard-react - DesignRevision'){
            var link = 'https://github.com/DesignRevision/shards-dashboard-react.git'
            fileGenearator(link, sitename )
        }
        });
};