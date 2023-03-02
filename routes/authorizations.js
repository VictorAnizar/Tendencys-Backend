//estructura del crud

const router = require('express').Router();
const {
    createAuthorization,
    getAuthorization,
    updateAuthorization,
    deleteAuthorization,
} = require('../controllers/authorizations');

const auth = require('./auth')


router.get('/', getAuthorization);
router.get('/:id', getAuthorization);
router.post('/', auth.requerido, createAuthorization);
router.put('/:id', auth.requerido, updateAuthorization);
router.delete('/:id', auth.requerido, deleteAuthorization);

module.exports = router; 