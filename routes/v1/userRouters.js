const express = require("express");
const { registerUser, loginUser, logoutUser, getUseresList, getUserProfile, updateUserProfile, checkUser } = require("../../controllers/userController");
const { userAuthentication } = require("../../middlewares/userAuth");
const { upload } = require("../../middlewares/multer");

const router = express.Router();

// Register a new user
router.post('/register', registerUser);
// Login user and get token
router.post('/login', loginUser);
// Logout user and clear the token
router.post('/logout', logoutUser);
// Get all useres list
router.get('/list', getUseresList);
// Get user profile
router.get('/profile', userAuthentication, getUserProfile);
// Update user profile
router.put('/profile/:id', userAuthentication, updateUserProfile);
// Check user
router.get('/check-user', userAuthentication, checkUser)

module.exports = { userRouter: router };
