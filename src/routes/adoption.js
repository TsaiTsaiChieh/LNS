const express = require('express');
const router = express.Router();

router.get('/pet', require('../controllers/adoption/petController'));

module.exports = router;
