/* 
    Event Routes
    host + /api/event
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

router.use( validateJWT );

router.get('/', getEvents );

router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    // check('notes', 'Notes is required').not().isEmpty(),
    check('start', 'Start date is required').custom( isDate ),
    check('end', 'End date is required').custom( isDate ),
    // check('user', 'User data is required').not().isEmpty(),
    validateFields
], createEvent );

router.put('/:id', [
    check('title', 'Title is required').not().isEmpty(),
    // check('notes', 'Notes is required').not().isEmpty(),
    check('start', 'Start date is required').custom( isDate ),
    check('end', 'End date is required').custom( isDate ),
], updateEvent );

router.delete('/:id', deleteEvent );

module.exports = router;