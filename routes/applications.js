//estructura del crud

const router = require('express').Router();
const prefix = 'logs';

const {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication,
} = require('../controllers/applications');

const auth = require('./auth')

// Obtener todas las applications
router.get(`/${prefix}/`, auth.requerido, getApplications);
// Obtener una application por su id en la base de datos
router.get(`${prefix}/:id`, auth.requerido, getApplications);
// Crear nueva application
router.post(`/${prefix}/`, auth.requerido, createApplication);
// Actualizar Application
router.put(`${prefix}/:id`, auth.requerido, updateApplication);
// Eliminar application
router.delete(`${prefix}/:id`, auth.requerido, deleteApplication);

module.exports = router; 