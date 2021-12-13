const express= require('express');
const jwt = require('jsonwebtoken')
const usersRouter = express.Router();

const {createUser, makeUserAdmin, getAllOrdersByUser, deleteUser, getUser} = require('../db/index');
const {requireAdmin, requireUser} = require('./utils')


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
        const user = await createUser(req.body);  // save user in db
        // const token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET, { expiresIn: '1w'}); /// create token?
        res.send({user}); // send user data to front end (part of post request)
    }
    catch (error) {
        next(error);   
    }

})

usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body;

    try {
        // if either of these are falsey it throws an error
        if (!username || !password) {
            throw Error("Please supply both a username and password");
        }

        const user = await getUser(req.body);
        if (!user) throw Error('Your username or password is incorrect!');

        const token = jwt.sign({id: user.id, username: user.username, isAdmin: user.isAdmin}, process.env.JWT_SECRET);

        res.send({
            message: 'successful login',
            token: token});
    } catch (error) {
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

// sends the orders of the matching userId
usersRouter.get('/orders/:userId', async (req, res, next) => {
    const {userId} = req.params;

    try {
        const userOrders = await getAllOrdersByUser(userId);

        res.send(userOrders);
    } catch (error) {
        next(error)
    }
})
// PATCH REQUESTS

usersRouter.patch('/admin/:userId', requireAdmin, async(req, res, next) => {
    const {userId} = req.params;

    try {
        const patchedUser = await makeUserAdmin(userId);
        res.send(patchedUser)
    } catch (error) {
        next(error)
    }
})

// DELETE REQUEST

usersRouter.delete('/admin/:userId', requireAdmin, async(req, res, next) => {
    const {userId} = req.params;

    try {
        const deletedUser = await deleteUser(userId);
        res.send(deletedUser);
    } catch (error) {
        next(error);
    }
})

module.exports = usersRouter;

