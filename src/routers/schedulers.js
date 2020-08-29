const express = require('express');
const router = express.Router();

router.get('/COA_data', require('../schedulers/setAdoptionsFromCOA'));

module.exports = router;
