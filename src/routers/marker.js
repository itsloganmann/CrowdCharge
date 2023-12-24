// Imports
const express = require('express')
const Charger = require('../models/charger')
const router = new express.Router()
const auth = require('../middleware/auth')
const geocode = require('../utils/geocode')

router.get('/markers', async (req, res) => {
    try {
        const chargers = await Charger.find();
        let promises = chargers.map(async charger => {
            try {
                let geoJSON = await geocode(charger.address + " " + charger.city);
                let properties = {
                    "name": charger.chargername,
                    "cost": charger.cost,
                    "rating": charger.rating,
                    "charger_id": charger._id,
                    "icon": "marker"
                }

                let geometry = {
                    "type": "Point",
                    "coordinates": [geoJSON.longitude, geoJSON.latitude]
                }

                let element = {
                    "type": "Feature",
                    "properties": properties,
                    "geometry": geometry
                };
                console.log(element);
                return (element);

            } catch (error) {
                console.log(error)
            }
        });
        const results = await Promise.all(promises)
        console.log(results)
        res.send(results);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router