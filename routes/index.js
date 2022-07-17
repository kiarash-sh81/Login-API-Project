const express = require('express');

const UserController = require('../controllers/User');

const router = express.Router();

router.post("/register" , UserController.register);//registe route
router.post("/login" , UserController.login);//login route

module.exports = router;