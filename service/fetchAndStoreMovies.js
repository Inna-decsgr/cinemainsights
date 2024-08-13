require('dotenv').config({ path: '../.env' });

const axios = require('axios');
const mongoose = require('mongoose');
const { PopularMovie, LatestMovie, GenreMovie } = require('../models/Movie');
const connectDB = require('../config/mongoose');

const TMDB_API_KEY = process.env.TMDB_API_KEY;

connectDB();

// 영화 감독 출연진 등 정보 가져오기
async function fetchCredits(movieId) {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=ko`;
    try {
        const response = await axios.get(creditsUrl);
        const crew = response.data.crew;
        const cast = response.data.cast;
        const director = crew.find(person => person.job === 'Director')?.name || 'Unknown';
        const castNames = cast.slice(0, 4).map(person => person.name).join(', ') || 'Unknown';

        return { director, cast: castNames };
    } catch (error) {
        console.error(`Error fetching credits for movie ID ${movieId}:`, error);
        return { director: 'Unknown', cast: 'Unknown' };
    }
}
// 영화 데이터 가져와서 MongoDB에 저장하는 함수
async function fetchAndStoreMovies(Model, url, genreId = null) {
    try {
        const response = await axios.get(url);
        const movies = response.data.results;

        for (const movie of movies) {
            const { director, cast } = await fetchCredits(movie.id);

            const newMovie = new Model({
                title: movie.title,
                description: movie.overview || 'No description available',
                director,
                cast: cast.split(', '),
                release_date: movie.release_date,
                rating: parseFloat(movie.vote_average.toFixed(1)),
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                genres: genreId ? [genreId] : movie.genre_ids
            });
            await newMovie.save();
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

async function fetchAndStoreGenreMovies() {
    try {
        const genreResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=ko`);
        const genres = genreResponse.data.genres;

        for (const genre of genres) {
            const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre.id}&language=ko&region=KR`;
            await fetchAndStoreMovies(GenreMovie, genreUrl, genre.id);
        }
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}

async function main() {
    try {
        await fetchAndStoreMovies(PopularMovie, `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=ko&region=KR`);
        await fetchAndStoreMovies(LatestMovie, `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=ko&region=KR`);
        await fetchAndStoreGenreMovies();
    } finally {
        mongoose.connection.close();
    }
}

main();
