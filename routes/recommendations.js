const express = require('express');
const router = express.Router();
const { Movies } = require('../models/Movie');


router.post('/', async (req, res) => {
    try {
        const { likedMovies, bookmarkedMovies } = req.body;

        if (!likedMovies || !bookmarkedMovies) {
            return res.status(400).json({ error: 'Liked movies and bookmarked movies are required.' });
        }

        // 모든 영화 가져오기
        const movies = await Movies.find();

        // 추천 영화 찾기
        const recommendations = getRecommendations(likedMovies, bookmarkedMovies, movies);

        res.json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 감독 또는 출연진이 일치하는 영화 추천
function getRecommendations(likedMovies, bookmarkedMovies, allMovies) {
    const recommendedMovies = new Set();

    // 좋아요한 영화의 감독과 출연진을 기준으로 추천 영화 추가
    likedMovies.forEach((likedMovie) => {
        const likedDirector = likedMovie.director || '';
        const likedCast = likedMovie.cast || [];

        allMovies.forEach((movie) => {
            const directorMatch = movie.director === likedDirector;
            const castMatch = likedCast.some(actor => movie.cast.includes(actor));

            if ((directorMatch || castMatch) && !recommendedMovies.has(movie.id)) {
                recommendedMovies.add(movie);
            }
        });
    });

    // 즐겨찾기한 영화의 감독과 출연진을 기준으로 추천 영화 추가
    bookmarkedMovies.forEach((bookmarkedMovie) => {
        const bookmarkedDirector = bookmarkedMovie.director || '';
        const bookmarkedCast = bookmarkedMovie.cast || [];

        allMovies.forEach((movie) => {
            const directorMatch = movie.director === bookmarkedDirector;
            const castMatch = bookmarkedCast.some(actor => movie.cast.includes(actor));

            if ((directorMatch || castMatch) && !recommendedMovies.has(movie.id)) {
                recommendedMovies.add(movie);
            }
        });
    });

    // 추천 영화 리스트를 배열로 변환하여 반환
    return Array.from(recommendedMovies);
}

module.exports = router;
