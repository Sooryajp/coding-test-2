const express = require('express');

const router = express.Router();

router.use('/pets',require('./pets'));
router.use('/users', require('./users'));


module.exports = router;
