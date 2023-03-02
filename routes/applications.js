//estructura del crud

const router = require('express').Router();
const {
    createApplication,
    getApplications,
    updateApplication,
    // deleteApplication,
} = require('../controllers/applications');

const auth = require('./auth')


// router.get('/limite=:limit', limitarNumeroRegistros);
// router.get('/:atributo=:valorContenido', obtenerRegistrosCoincidenciaAtributos);
router.get('/', getApplications);
router.get('/:id', getApplications);
// router.get('/tipo/:tipo', listarRecursoPorTipo);
router.post('/', auth.requerido, createApplication);
router.put('/:id', auth.requerido, updateApplication);
// router.delete('/:id', auth.requerido, eliminarRecurso);

module.exports = router; 