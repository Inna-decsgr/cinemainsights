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


router.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: '쿼리 파라미터가 필요합니다.' });
    }
    
    // 정규 표현식 생성
    const regex = new RegExp(query, 'i'); // 대소문자 구분 없이 검색

    try {
        // 배열 필드에 대한 검색 조건을 포함한 검색 조건을 생성합니다.
        const searchConditions = [
            { title: regex },
            { description: regex },
            { director: regex },
            {
                $or: [
                    { "cast.0": regex },
                    { "cast.1": regex },
                    { "cast.2": regex },
                    { "cast.3": regex }
                ]
            }
        ];

        // 모든 검색 작업을 병렬로 실행하고 결과를 병합
        const [genreMovies, latestMovies, popularMovies] = await Promise.all([
            GenreMovie.find({ $or: searchConditions }),
            LatestMovie.find({ $or: searchConditions }),
            PopularMovie.find({ $or: searchConditions })
        ]);

        const movies = [...genreMovies, ...latestMovies, ...popularMovies];

        res.json({ movies });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
