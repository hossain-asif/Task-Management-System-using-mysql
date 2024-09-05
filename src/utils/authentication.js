

const jwt = require('jsonwebtoken');


function createToken( email ){
    let token = jwt.sign(
        { email: email },
        'secret',
        {expiresIn: '1h'}
    );
    return token;
}


function verifyToken(token){
    try {
        const result = jwt.verify(token, 'secret');
        return result;
    }catch(err){
        console.log('Token not verified');
        console.log(err);
        return null;
    }
}

module.exports = {
    createToken,
    verifyToken
}