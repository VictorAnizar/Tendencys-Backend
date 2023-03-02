//estructura del crud

const router = require('express').Router();
const prefix = 'logs';

const {
    createUser,
    login,
    getUser
} = require('../controllers/users');

const auth = require('./auth')


router.get('/', getUser);
router.get('/:id', getUser);
router.post('/signup', auth.opcional, createUser);
router.post('/login', auth.opcional, login);

module.exports = router; 