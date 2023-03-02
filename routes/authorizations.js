//estructura del crud

const router = require('express').Router();
const prefix = 'logs';

const {
    createAuthorization,
    getAuthorization,
    updateAuthorization,
    deleteAuthorization,
} = require('../controllers/authorizations');

const auth = require('./auth')


router.get(`${prefix}/`, getAuthorization);
router.get(`${prefix}/:id`, getAuthorization);
router.post(`${prefix}/`, auth.requerido, createAuthorization);
router.put(`${prefix}/:id`, auth.requerido, updateAuthorization);
router.delete(`${prefix}/:id`, auth.requerido, deleteAuthorization);

module.exports = router; 