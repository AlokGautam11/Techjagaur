const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, changePassword } = require('../controllers/userController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protectAdmin, getMe);
router.post('/change-password', protectAdmin, changePassword);

module.exports = router;
