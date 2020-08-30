const express = require('express');
const router = express.Router();

router.get('/adoption', require('../controllers/index/adoptionController'));

module.exports = router;
