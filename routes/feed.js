const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feedController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


// POST 
router.post('/post', isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createPost
);

//GET
router.get('/post/:postId', isAuth, feedController.getPost);

//Put
router.put(
  '/post/:postId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.updatePost
);


router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;
