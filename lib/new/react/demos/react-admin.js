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
        else if(answers.adminType == 'material-dashboard-react - creativetimofficial'){
            var link = 'https://github.com/creativetimofficial/material-dashboard-react.git'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'sb-admin-react - start-react'){
            var link = 'https://github.com/start-react/sb-admin-react.git'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'light-bootstrap-dashboard-react - creativetimofficial'){
            var link = 'https://github.com/creativetimofficial/light-bootstrap-dashboard-react.git'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'crystal-dashboard - JSLancerTeam'){
            var link = 'https://github.com/JSLancerTeam/crystal-dashboard.git'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'black-dashboard-react - creativetimofficial'){
            var link = 'https://github.com/creativetimofficial/black-dashboard-react.git'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'argon-dashboard-react - creativetimofficial'){
            var link = 'https://github.com/creativetimofficial/argon-dashboard-react.git'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'react-material-admin - flatlogic'){
            var link = 'https://github.com/flatlogic/react-material-admin.git'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'paper-dashboard-react - creativetimofficial'){
            var link = 'https://github.com/flatlogic/react-material-admin.git'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'now-ui-dashboard-react - creativetimofficial'){
            var link = 'https://github.com/creativetimofficial/now-ui-dashboard-react.git'
            fileGenearator(link, sitename )
        }
        else if(answers.adminType == 'Vibe - NiceDash'){
            var link = 'https://github.com/NiceDash/Vibe.git'
            fileGenearator(link, sitename )
        }
        });
};