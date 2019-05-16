// Imports
const express = require('express')
const Charger = require('../models/charger')
const router = new express.Router()
const auth = require('../middleware/auth')
const geocode = require('../utils/geocode')

router.get('/markers', async(req, res)=>{
    try{
        const chargers = await Charger.find();
        let promises = chargers.map(async charger=>{
            try{
                let geoJSON = await geocode(charger.location+" "+charger.city+" "+charger.province+" "+charger.country);
                let properties = {
                    "name" : charger.name,
                    "rate" : charger.rate,
                    "rating" : charger.rating
                }
    
                let geometry = {
                    "type" : "Point",
                    "coordinates" : [geoJSON.longitude,geoJSON.latitude]
                }
    
                let element = {
                    "type" : "Feature",
                    "Properties" : properties,
                    "geometry" : geometry
                };
                console.log(element);
                return(element);
            
            }catch(error){
                console.log(error)
            }
        });
        const results = await Promise.all(promises)
        console.log(results)
        res.send(results);
    }catch(error){
        console.log(error);
    }
})

module.exports = router