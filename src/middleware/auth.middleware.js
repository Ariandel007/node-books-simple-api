const jwt =  require('jsonwebtoken');
const { groups } = require('../utils/constants');

class Auth {
    
    constructor(groupsAllowed) {
        this.groupsAllowed = groupsAllowed;
    }

    auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
            if (this.groupsAllowed.some(x => x == decodedToken.rol)) {
                req.decodedToken = decodedToken;
                next();    
            } else {
                throw new Error('No tiene permiso a este recurso');
            }
    
        } catch (error) {
            return res.status(401).send({error: 'Por favor autentiquese'})
        }
    }
}

const authAdminInit = new Auth(groups.admin);
const authUserInit = new Auth(groups.users);

module.exports = {
    authAdmins: authAdminInit.auth,
    authUsers: authUserInit.auth,
};