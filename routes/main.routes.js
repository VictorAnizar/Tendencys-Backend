'use strict';

const router = require('express').Router();
const prefix = 'logs';

const controller = require('../controllers/main.controller');

// Se obtienen las rutas para applications
router.use('/applications', require('./applications'));

// Se obtienen las rutas para authorizations
router.use('/authorizations', require('./authorizations'));

// // Se obtienen las rutas para logs
router.use('/logs', require('./logs'));


// router.get(`${prefix}/`, controller.all);
// router.post(`${prefix}/`, controller.create);
// router.get(`${prefix}/:id`, controller.info);
// router.put(`${prefix}/:id`, controller.update);
// router.delete(`${prefix}/:id`, controller.delete);

module.exports = router;