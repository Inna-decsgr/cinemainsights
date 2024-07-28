require('dotenv').config({ path: '../.env' });

const axios = require('axios');
const mongoose = require('mongoose');  // mongoose 모듈 가져오기
const { PopularMovie, LatestMovie } = require('../models/Movie');
const connectDB = require('../config/mongoose');  // MongoDB 연결 가져오기

// TMDb API 키 설정
const TMDB_API_KEY = process.env.TMDB_API_KEY;

connectDB();

// 영화의 출연진 및 제작진 정보를 가져오는 함수
async function fetchCredits(movieId) {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`;
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
async function fetchAndStoreMovies(Model, url) {
    try {
        const response = await axios.get(url);
        const movies = response.data.results;

        for (const movie of movies) {
            const { director, cast } = await fetchCredits(movie.id);

            const newMovie = new Model({
                title: movie.title,
                description: movie.overview,
                director,
                cast: cast.split(', '),
                release_date: movie.release_date,
                rating: movie.vote_average,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            });
            await newMovie.save();
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// 비동기 작업 완료 후 MongoDB 연결 종료
async function main() {
    try {
        // 인기 영화 가져오기
        await fetchAndStoreMovies(PopularMovie, `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`);
        // 최신 영화 가져오기
        await fetchAndStoreMovies(LatestMovie, `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}`);
    } finally {
        mongoose.connection.close();
    }
}

// 영화 데이터 가져오기 및 저장 함수 호출
main();
