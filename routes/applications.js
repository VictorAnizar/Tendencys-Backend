//estructura del crud

const router = require('express').Router();
const {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication,
} = require('../controllers/applications');

const auth = require('./auth')


router.get('/', getApplications);
router.get('/:id', getApplications);
router.post('/', auth.requerido, createApplication);
router.put('/:id', auth.requerido, updateApplication);
router.delete('/:id', auth.requerido, deleteApplication);

module.exports = router; 