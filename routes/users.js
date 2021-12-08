const express= require('express');
const usersRouter = express.Router();

const {createUser} = require('../db/index');


// POST REQUESTS

usersRouter.post('/register', async(req, res, next)=>{
    const MIN_PASSWORDLENGTH = 8;
    const {username, password} = req.body;
    try {
        if(password.length < MIN_PASSWORDLENGTH) { //check the password length
            throw new Error("Password must be 8 or more characters");  //error if password is too short
        }
        // const _user = await functionname(username);    //check if the username already exists ?
        // if(_user) {
        //     throw new Error('A user by that name already exists');
        // }
        const user = await createUser({username, password});  // save user in db
        // const token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET, { expiresIn: '1w'}); /// create token?
        res.send({user}); // send user data to front end (part of post request)
    }
    catch (error) {
        next(error);   
    }

})

// GET REQUESTS

usersRouter.get('/:username', async (req, res, next) => {
    const {id} = req.params; // user id should be stored in req (comes from the user)
    try {
        const user = await getUserById({id});
        res.send(user);    // populate routine information
    }
    catch (error) {
        next(error);
    }
} )


module.exports = usersRouter;

