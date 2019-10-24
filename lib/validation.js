const emailValidation = (input) => {
    if (input.includes('@') && input.indexOf('@') != 0) {
        return true;
    }
        else{
            return "This is not a valid Email";
        }
} 

const passwordValidation = input => {
    if (input.match(/[a-z]/g) && input.length >= 8 && input.match( 
        /[^a-zA-Z\d]/g)) {
        return true;
    }
        else{
            return "The Password should be 8 characters and must contain a special character";
        }
}

const linkValidation = input => {
    if(input.includes('http') && input.indexOf('http') == 0){
        return true;
    }
    else{
        return 'The url must start with http or https'
    }
}

const folderName = input => {
    if (input.match(/[a-z]/g) && input.length >= 1) {
        return true;
    }
        else{
            return "Enter a valid input";
        }
}


module.exports = {emailValidation, passwordValidation, linkValidation, folderName}