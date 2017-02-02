'use strict';
const router = require('express').Router();
const MapHandler = require('../handlers/map.handler.js');


router.get('/', MapHandler.getAllCoords);

router.post('/', MapHandler.updateUserCoord);

router.delete('/', MapHandler.removeUserCoord);

module.exports = router;
