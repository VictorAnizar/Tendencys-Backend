//estructura del crud

const router = require('express').Router();
const {
    createLog,
    getLog,
    updateLog,
    deleteLog,
} = require('../controllers/logs');

const auth = require('./auth')


router.get('/', getLog);
router.get('/:id', getLog);
router.post('/', auth.requerido, createLog);
router.put('/:id', auth.requerido, updateLog);
router.delete('/:id', auth.requerido, deleteLog);

module.exports = router; 