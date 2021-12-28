const client = require('./client');

const bcrypt = require('bcrypt'); // import bcrypt

//============== USERS ==============================
//----------------- create users ---------------------

async function createUser({username, password, email, isAdmin}) {
    const SALT_COUNT = 10;   // salt makes encryption more complex
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    if (!isAdmin) {
      isAdmin = false;
    }

    try {
        const {rows: [user]} = await client.query(`
            INSERT INTO users (username, password, email, "isAdmin")
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `, [username, hashedPassword, email, isAdmin]);  // create user in db
        delete user.password;
        return user;     // populate user info
    }
    catch (error) {
        throw error;
    }
  }

  // ------------------get user--------------------------

  async function getUser({username, password}) { 
    try {
      const user = await getUserByUsername(username);

      if (!user) throw Error('Your username or password is incorrect!'); // verify that the username exists

      // comparing the password sent in to the password of that username
      // we need bcrypt because the password is encrypted
      const passwordIsMatch = await bcrypt.compare(password, user.password); // verify passwords match

      if (passwordIsMatch) {   // if passwords match delete password and continue
        delete user.password;
        return user;  // populate user info which can be accessed by backend api
      } else {
        return false;   // why is this false needed? otherwise throw error?
      }
    } catch (error) {
      throw error;
    }
  }

  // -------------------get user (with user id)---------------

  async function getUserById(id){
    try{
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE id= $1;
        `, [id]);

        delete user.password;

        return user;
    }
    catch(error){
        throw error;
    }
  }

// ------------------- get user (with username) -------------

async function getUserByUsername(username) {
    try {
      const {rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1`, [username]);
  
      return user;
    } catch (error) {
      throw error;
    }
  }

  // ---------- make a user into an admin ---------------------

  async function makeUserAdmin(id){
    try {
      const {rows: [user]} = await client.query(`
        UPDATE users
        SET "isAdmin"=true
        WHERE id=$1
        RETURNING *;
      `, [id])
      return user;
    } catch (error) {
      throw error;
    }
  }

// ---------- get all users -----------------------------------

async function getAllUsers(){ // select all the users
    try {
      const {rows: users} = await client.query(`
        SELECT *
        FROM users
        WHERE "isActive"=true;
      `);
      return users;   // return all the users
    } catch (error) {
      throw error;
    }
  }

// --------- delete a user -------------------------------------

async function deleteUser(userId){
    try {

      const {rows: [user]} = await client.query(`
        UPDATE users
        SET "isActive"=false
        WHERE id=$1
        RETURNING *;
      `, [userId]);   

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    makeUserAdmin,
    getAllUsers,
    deleteUser,
  }
  