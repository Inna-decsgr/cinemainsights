const express = require('express');
const router = express.Router();
const { PopularMovie, LatestMovie, GenreMovie, Movies } = require('../models/Movie');


router.post('/', async (req, res) => {
    try {
        const { likedMovies, bookmarkedMovies } = req.body;

        if (!likedMovies || !bookmarkedMovies) {
            return res.status(400).json({ error: 'Liked movies and bookmarked movies are required.' });
        }

        // 모든 영화 가져오기
        const allMovies = await Movies.find();

        // 추가적으로 popular, latest, genreMovies 데이터 가져오기
        const [popularMovies, genreMovies, latestMovies] = await Promise.all([
            PopularMovie.find(),
            LatestMovie.find(),
            GenreMovie.find()
        ]);

        // 추천 영화 찾기
        const recommendations = getRecommendations(likedMovies, bookmarkedMovies, allMovies);
        //console.log('추천', recommendations);

        // 추천 영화의 title을 기준으로 popular, latest, genreMovies에서 매칭되는 영화의 _id로 대체
        const updatedRecommendations = recommendations.map(movie => {
            const matchingMovie = popularMovies.find(m => m.title === movie.title) ||
                genreMovies.find(m => m.title === movie.title) ||
                latestMovies.find(m => m.title === movie.title);
            
            const movieId = matchingMovie && matchingMovie.id ? matchingMovie.id : movie._id;
            // 매칭된 영화가 있으면 _id를 덮어쓰기, 없으면 기존 _id 유지
            if (matchingMovie) {
                return { ...movie, movieId: movieId };
            } else {
                return movie;
            }
        });
        console.log('업데이트 추천', updatedRecommendations);

        res.json(updatedRecommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 감독 또는 출연진이 일치하는 영화 추천
function getRecommendations(likedMovies, bookmarkedMovies, allMovies) {
    const recommendedMovies = [];

    // 좋아요한 영화의 감독과 출연진을 기준으로 추천 영화 추가
    likedMovies.forEach((likedMovie) => {
        const likedDirector = likedMovie.director || '';
        const likedCast = likedMovie.cast || [];

        allMovies.forEach((movie) => {
            const directorMatch = movie.director === likedDirector;
            const castMatch = likedCast.some(actor => movie.cast.includes(actor));

            if ((directorMatch || castMatch) && !recommendedMovies.includes(movie.id)) {
                recommendedMovies.push(movie);
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

            if ((directorMatch || castMatch) && !recommendedMovies.includes(movie.id)) {
                recommendedMovies.push(movie);
            }
        });
    });

    // 추천 영화 리스트를 배열로 변환하여 반환
    return recommendedMovies;
}

module.exports = router;