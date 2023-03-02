//estructura del crud

const router = require('express').Router();
const prefix = 'logs';

const {
    createUser,
    login,
    getUser
} = require('../controllers/users');

const auth = require('./auth')


router.get(`/${prefix}/`, getUser);
router.get(`/${prefix}/:id`, getUser);
router.post(`/${prefix}/signup`, auth.opcional, createUser);
router.post(`/${prefix}/login`, auth.opcional, login);

module.exports = router; 