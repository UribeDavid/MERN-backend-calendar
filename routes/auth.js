/* 
    Auth Routes
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

router.post(
    '/new', 
    [
        // check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        // check('password', 'Password must contain at least 6 digits').isLength({ min: 6 }),
        validateFields,
    ], 
    createUser );

router.post(
    '/', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must contain at least 6 digits').isLength({ min: 6 }), 
        validateFields,
    ], loginUser );

router.get('/renew', [validateJWT], revalidateToken );

module.exports = router;