const express = require('express');
const bodyParser = require("body-parser");

const router = express.Router();
const controller = require('../controllers/controller_site');

router.get('/', controller.index);
router.get('/openyaer', controller.openyaer);
router.get('/rempoz', controller.rempoz);
router.post('/upload', controller.upload); //загрузка файлов
router.get('/addyaer', controller.addyaer);
router.get('/rename', controller.rename);
router.get('/save', controller.save);
router.get('/adbloc', controller.adbloc);
router.get('/openvse', controller.openvse);
module.exports = router;