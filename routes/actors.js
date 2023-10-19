const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

// Rutas CRUD para la tabla "actor"
router.get('/actors', actorsController.getAllActors);
router.get('/actors/:id', actorsController.getActorById);
router.post('/actors', actorsController.createActor);
router.put('/actors/:id', actorsController.updateActor);
router.delete('/actors/:id', actorsController.deleteActor);

module.exports = router;
