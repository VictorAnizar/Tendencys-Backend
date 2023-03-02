//estructura del crud

const router = require('express').Router();
const prefix = 'logs';

const {
    createLog,
    getLog,
    updateLog,
    deleteLog,
} = require('../controllers/logs');

const auth = require('./auth')


router.get(`/${prefix}/`,auth.requerido, getLog);
router.get(`/${prefix}/:id`,auth.requerido, getLog);
router.post(`/${prefix}/`, auth.requerido, createLog);
router.put(`/${prefix}/:id`, auth.requerido, updateLog);
router.delete(`/${prefix}/:id`, auth.requerido, deleteLog);

module.exports = router; 