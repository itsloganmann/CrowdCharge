// Imports
const express = require('express')
const Charger = require('../models/charger')
const Booking = require('../models/booking')
const User = require('../models/user')

const router = new express.Router()
const auth = require('../middleware/auth')

// Gets the user's chargers
router.get('/chargers', auth, async (req, res) => {
    try {
        const ownerid = req.user._id
        const charger = await Charger.find({ owner: ownerid })
        if (!charger) {
            return res.status(400).send({ error: 'Could not find any user chargers!' })
        }
        res.send(charger)
    } catch (error) {
        console.log(error)
        res.status(400).send("Error, could not get charger.")
    }
})

// Gets a specific charger by charger ID
router.get('/charger/query', async (req, res) => {
    try {
        const charger_id = req.query.charger_id
        const charger = await Charger.find({ _id: charger_id })
        if (!charger) {
            return res.status(400).send({ error: 'Could not find this charger!' })
        }
        res.send(charger)
    } catch (error) {
        console.log(error)
        res.status(400).send("Error, could not get charger.")
    }
})


// Creates a new charger
router.post('/charger/new', auth, async (req, res) => {
    const charger = new Charger(req.body)
    charger.owner = req.user._id

    try {
        await charger.save()
        res.status(201).send(charger)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Updates a charger's own profile
router.patch('/charger', auth, async (req, res) => {
    // Specifies what is allowed to be updated in the db
    const charger_id = req.query.cUID
    const updates = Object.keys(req.body)
    const allowedUpdates = ['chargername', 'address', 'city', 'type', 'level', 'cost', 'details']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // Checks if the update is valid operation
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const charger = await Charger.findById(charger_id)
        // Small adjustment required to use middleware. Updates charger data.
        await updates.forEach((update) => {
            charger[update] = req.body[update]
        })
        await charger.save()

        // Sends back the found charger data back after updating it
        res.send(JSON.stringify(charger))
    } catch (error) {
        console.log(error)
    }
})

// Deletes a charger
router.delete('/chargers/:id', auth, async (req, res) => {
    try {
        const charger = await Charger.findByIdAndDelete(req.params.id)

        if (!charger) {
            return res.status(404).send()
        }

        res.send(charger)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// Sets a unavailable block for a charger
router.post('/charger/setUnavailable/:id', auth, async (req, res) => {
    try {
        let unavail = new Booking(req.body);
        unavail.client = req.user;
        unavail.state = "PAID";
        await unavail.save()
        res.status(201).send(charger)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Gets scheduled bookings for a charger on a day
router.get('/charger/schedule', auth, async (req, res) => {
    try {
        let schedule = await getChargerBookings(req.query.cUID, "PAID", req.query.date);
        schedule = schedule.concat(await getChargerBookings(req.query.cUID, "UNPAID", req.query.date));
        res.send(schedule);
    } catch (error) {
        console.log(error)
        res.send("Error: ", error);
    }
})

let getChargerBookings = async function(cUID,state,date){
    try{
        const time = "00:00:00"
        let today = new Date(date + " " + time);
        let tomorrow = new Date(date + " " + time);
        tomorrow = new Date(tomorrow.setDate(today.getDate() + 1));
        const bookings = await Booking.find( {charger : cUID, state : state, timeStart : {"$gte" : today, "$lt" : tomorrow}} );
        var promises = bookings.map(async booking=>{
            try{
                const charger = await Charger.findById(booking.charger);
                const client = await User.findById(booking.client);
                let element = {};
                element.startTime = booking.timeStart;
                element.endTime = booking.timeEnd;
                element.cost = booking.cost;
                element.address = charger.address;
                element.city = charger.city;
                element.province = charger.province;
                element.client = client.name;
                element.cName = charger.cName;
                if (state == "PENDING")
                    element.bookingID = booking._id;
                return element;
            } catch (error) {
                console.log(error)
            }
        });
        const results = await Promise.all(promises)
        return results;
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
module.exports = router