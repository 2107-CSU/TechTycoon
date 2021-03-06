const express= require('express');
const jwt = require('jsonwebtoken')
const usersRouter = express.Router();
const {createUser, makeUserAdmin, getAllOrdersByUser, deleteUser, getUser, getUserByUsername, getUserById, getAllUsers} = require('../db/index');
const {requireAdmin, requireUser} = require('./utils')


// POST REQUESTS

usersRouter.get('/check/:username', async (req, res, next) => {
    try{
        const {username} = req.params;
        console.log(username);
        const user = await getUserByUsername(username);
        res.send(!!user);
    } catch(error){
        next(error);
    }
})

usersRouter.post('/register', async(req, res, next)=>{
    const MIN_PASSWORDLENGTH = 8;
    const {username, password, email} = req.body;

    try {
        if(password.length < MIN_PASSWORDLENGTH) { //check the password length
            throw new Error("Password must be 8 or more characters");  //error if password is too short
        }
        const userCheck = await getUserByUsername(username); //check if the username already exists
        if(userCheck) {
            throw new Error('A user by that name already exists');
        }
        if(!email.includes('@')) throw new Error('email is not valid');
        const user = await createUser(req.body);  // save user in db

        const token = jwt.sign({id: user.id, username: user.username, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
        user.token = token; // adding token to user object

        res.send(user); // send user data to front end
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

        if (!user.isActive) throw Error('account has been removed for failure to abide by site rules!')
        const token = jwt.sign({id: user.id, username: user.username, isAdmin: user.isAdmin}, process.env.JWT_SECRET);

        res.send({
            message: 'successful login',
            token: token});
    } catch (error) {
        next(error);
    }
})
// GET REQUESTS
usersRouter.get('/all', requireAdmin, async (req, res , next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        next(error)
    } 
})

usersRouter.get('/me', requireUser, async (req, res, next) => {
    const {id} = req.user; // user id should be stored in req (comes from the user)
    try {
        const user = await getUserById(id);
        res.send(user);    // populate routine information
    }
    catch (error) {
        next(error);
    }
} )


// sends the orders of the matching userId
// PROBABLY A DUPLICATE
// REVIEW THE WORKSHOP INFO BEFORE DELETING
// MIGHT HAVE ADMIN USAGE
/*
usersRouter.get('/orders/:userId', async (req, res, next) => {
    const {userId} = req.params;

    try {
        const userOrders = await getAllOrdersByUser(userId);

        res.send(userOrders);
    } catch (error) {
        next(error)
    }
})
*/
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

usersRouter.patch('/admin/delete/:userId', requireAdmin, async (req, res, next) => {
    const {userId} = req.params;

    try {
        const deletedUser = await deleteUser(userId);
        res.send({
            "message": 'success',
            "user": deletedUser
    });
    } catch (error) {
        next(error);
    }
})

module.exports = usersRouter;

