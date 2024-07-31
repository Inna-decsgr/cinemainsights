const express = require('express');
const router = express.Router();
const { PopularMovie, LatestMovie, GenreMovie } = require('../models/Movie');


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

// 장르별 영화 정보 가져오기
router.get('/genre/:genreId', async (req, res) => {
    const genreId = parseInt(req.params.genreId, 10); // 장르 ID를 정수로 변환
    console.log(`Received request for genre ID: ${genreId}`);
    
    try {
        const movies = await GenreMovie.find({ genres: genreId });
        console.log(`Found movies: ${movies.length}`);
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
