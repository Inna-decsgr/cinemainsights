const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    cast: {
        type: [String], // cast 필드를 배열로 정의
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    poster_url: { // 영화 포스터 URL 필드 추가
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    comments: [CommentSchema]
});
// 각각 다른 컬렉션에 저장되는 모델 정의
const PopularMovie = mongoose.model('PopularMovie', MovieSchema, 'PopularMovies');
const LatestMovie = mongoose.model('LatestMovie', MovieSchema, 'LatestMovies');
const GenreMovie  = mongoose.model('GenreMovie', MovieSchema, 'GenreMovies');

module.exports = { PopularMovie, LatestMovie, GenreMovie}; 