const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//ROTA DE LOGIN.
routes.post('/sessions', SessionController.create);

//LISTANDO TODAS AS ONGS.
routes.get('/ongs', OngController.index);

//CADASTRANDO UMA ONG.
routes.post('/ongs', OngController.create);

//CADASTRANDO UM CASO.
routes.post('/incidents', IncidentController.create);

//LISTANDO TODOS OS CASOS.
routes.get('/incidents', IncidentController.index);

//DELETANDO UM CASO.
routes.delete('/incidents/:id', IncidentController.delete);

//LISTANDO OS CASOS DE DETERMINADA ONG.
routes.get('/profile', ProfileController.index);

module.exports = routes;