const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

    const events = await Event.find()
                              .populate('user', 'name');
    res.json({
        ok: true,
        events
    });
}

const createEvent = async (req, res = response) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;
        
        const eventSaved = await event.save();
        res.json({
            ok: true,
            event: eventSaved
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Contact the admin"
        })
    }
}

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;

    try {
        
        const eventDB = await Event.findById(eventId);

        if ( !eventDB ) return res.status(404).json({
            ok: false,
            msg: 'Event was not found'
        });

        if ( req.uid !== eventDB?.user?.toString() ) return res.status(401).json({
            ok: false,
            msg: 'Not authorizated'
        });

        const newEvent = {
            ...req.body,
            user: req.uid
        };

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            event: updatedEvent
        });    

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact the admin'
        });
    }
    
}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;

    try {
        const eventDB = await Event.findById(eventId);

        if ( !eventDB ) return res.status(404).json({
            ok: false,
            msg: 'Event was not found'
        });

        if ( req.uid !== eventDB?.user?.toString() ) return res.status(401).json({
            ok: false,
            msg: 'Not authorizated'
        });

        const deletedEvent = await Event.findByIdAndRemove( eventId );

        res.json({
            ok: true,
            event: deletedEvent
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contact the admin'
        });
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}