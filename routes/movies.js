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

// 영화 검색
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


// 특정 영화 정보 가져오기
router.get('/:id', async (req, res) => {
    const movieId = req.params.id; // 영화 ID를 가져옵니다
    
    try {
        // 여러 컬렉션에서 영화 ID로 영화 조회
        const collections = [PopularMovie, LatestMovie, GenreMovie];
        const moviePromises = collections.map(collection => collection.findById(movieId));
        const movies = await Promise.all(moviePromises);
        
        // 영화가 있는 첫 번째 컬렉션의 데이터를 반환
        const movie = movies.find(movie => movie !== null);
        if (!movie) {
            return res.status(404).json({ message: '영화를 찾을 수 없습니다.' });
        }
        res.json(movie); // 영화 정보를 JSON 형식으로 응답

    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ message: '서버 오류' }); // 오류 발생 시 서버 오류 응답
    }
});

module.exports = router;
