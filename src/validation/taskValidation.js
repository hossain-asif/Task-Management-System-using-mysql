



function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function validateString(name) {
    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    return nameRegex.test(name);
}


module.exports = {
    validateEmail,
    validateString
}