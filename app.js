require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/mongoose.js')


const app = express();

// Middleware 설정
app.use(bodyParser.json());
app.use(cookieParser());

// CORS 설정
app.use(cors({
  origin: 'http://localhost:8080', // 프론트엔드 주소
  credentials: true,
}));

// MongoDB 연결 설정
connectDB();

// Routes 설정
app.use('/api/users', require('./routes/users'));  // 사용자 관련 라우트
app.use('/api/auth', require('./routes/auth'));  // 인증 관련 라우트
app.use('/api/protected', require('./routes/protected'));  // 보호된 경로
app.use('/api/movies', require('./routes/movies'));  // 영화 관련 라우트
app.use('/api/likes', require('./routes/likes'));  // 찜 관련 라우트
app.use('/api/bookmarks', require('./routes/bookmarks'));  // 즐겨찾기 관련 라우트
app.use('/api/recommendations', require('./routes/recommendations'));  // 추천 영화 관련 라우트
app.use('/api/recommendGenres', require('./routes/recommendGenres'));  // 장르별 추천 영화 관련 라우트
app.use('/api/reviews', require('./routes/reviews'));  // review 관련 라우트



// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



