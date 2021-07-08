const express = require("express");
const router = express.Router();

// Load model
const Postcode = require("../../models/Postcode");
const Placename = require("../../models/Placename");
const Matching = require("../../models/Matching");

router.get("/postcodes", async (req, res) => {
    try {
        const { q } = req.query;
        const postCodes = await Postcode.find({ $or: [{ "postcode": { "$regex": q, "$options": "i" } }, { "locality": { "$regex": q, "$options": "i" } } ]});
        return res.json({ success: true, data: postCodes });
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: 'Something went wrong!' });
    }
});

router.get("/all-postcodes", async (req, res) => {
    try {
        const postCodes = await Postcode.find();
        return res.json({ success: true, data: postCodes });
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: 'Something went wrong!' });
    }
});

router.get("/placenames", async (req, res) => {
    try {
        const placeNames = await Placename.find();
        return res.json({ success: true, data: placeNames });
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: 'Something went wrong!' });
    }
});

router.post("/match", async (req, res) => {
    try {
        const { placename, postcode } = req.body;
        const newMatch = new Matching({
            placename, postcode
        });
        newMatch.save();   
        return res.json({ success: true })
    } catch (err) {
        console.log(err)
        return res.json({ success: false })
    }
});

module.exports = router;
