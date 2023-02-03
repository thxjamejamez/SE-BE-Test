const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.put('/update', userController.update);
router.get('/export', userController.exportToCsv);

module.exports = router;