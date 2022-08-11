
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
     
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).send('Access denied. Not authenticated.');
    }
    try{
        const secretKey = process.env.JWT_SECRET_KEY;

     const user= jwt.verify(token, secretKey)
        req.user=user;
        next();
    }
    catch(err){
        return res.status(401).send('Invalid auth.');
    }
};
const isUser = (req, res, next) => {
    auth(req, res, () => {
        if(req.user._id === req.params.id || req.user.isAdmin || req.user.isStaff)
        {
            next();
        }
        else
        {
            return res.status(401).send('Unauthorized');
        }
    }
    );
}

const isStaff = (req, res, next) => {
    auth(req, res, () => {
        if(req.user._id === req.params.id || req.user.isAdmin || req.user.isUser)
        {
            next();
        }
        else
        {
            return res.status(401).send('Unauthorized');
        }
    }
    );
}

 // if(req.user.isAdmin)

const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if(req.user.isAdmin){
            next();
        }
        else{
            return res.status(401).send('Access denied. Not authorised...');
        }

    }
    );
};
module.exports = {auth, isUser, isStaff, isAdmin};

