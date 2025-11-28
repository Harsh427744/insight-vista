    const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// GET /api/data with optional filters
router.get('/', async (req, res) => {
  try {
    const query = {};

    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      country,
    } = req.query;

    if (end_year) query.end_year = end_year;
    if (topic) query.topic = topic;
    if (sector) query.sector = sector;
    if (region) query.region = region;
    if (pestle) query.pestle = pestle;
    if (source) query.source = source;
    if (country) query.country = country;

    const data = await Data.find(query).limit(500);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error!!' });
  }
});

module.exports = router;
