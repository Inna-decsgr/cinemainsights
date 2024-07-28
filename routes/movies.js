const express = require('express');
const router = express.Router();
const { PopularMovie, LatestMovie } = require('../models/Movie');

// 인기 영화 정보 가져오기
router.get('/popular', async (req, res) => {
    try {
        const movies = await PopularMovie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching popular movies' });
    }
});

// 최신 영화 정보 가져오기
router.get('/latest', async (req, res) => {
    try {
        const movies = await LatestMovie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest movies' });
    }
});


module.exports = router;
