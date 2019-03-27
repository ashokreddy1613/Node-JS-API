const express = require('express');
const { body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const User = require('../models/user');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


const router = express.Router();

router.post( '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post('/login', authController.login);

//Routes path to access users
router.get('/users', isAuth, isAdmin, userController.getUsers);
router.put('/user/:id', isAuth, isAdmin, userController.updateUser);
router.delete('/user/:id', isAuth, isAdmin, userController.deleteUser);

module.exports = router;
