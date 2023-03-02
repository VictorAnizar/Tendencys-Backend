//estructura del crud

const router = require('express').Router();
const {
    createUser,
    login,
    getUser
} = require('../controllers/logs');

const auth = require('./auth')


router.get('/', getUser);
router.get('/:id', getUser);
router.post('/signup', auth.opcional, createUser);
router.post('/login', auth.opcional, login);

module.exports = router; 