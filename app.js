const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { expressjwt: expressJwt } = require('express-jwt'); // 수정된 임포트 방법
const cookieParser = require('cookie-parser');


dotenv.config(); // 환경 변수 로드

const PORT = process.env.PORT || 5000;
const secret = process.env.JWT_SECRET;

const app = express();

// Middleware 설정
app.use(bodyParser.json());
app.use(cookieParser());

// CORS 설정
app.use(cors({
  origin: 'http://localhost:8080', // 프론트엔드 주소
  credentials: true
}));

// DB 설정
const db = process.env.MONGO_URI; // 환경 변수에서 MongoDB URI 로드

// MongoDB랑 연결하기
mongoose.connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// JWT 검증 미들웨어
app.use(expressJwt({
  secret: secret,
  algorithms: ['HS256'],
  getToken: (req) => req.cookies.token
}).unless({ path: ['/api/auth/login', '/api/users'] })); // 로그인 라우트와 사용자 생성 라우트는 제외


app.use((req, res, next) => {
  console.log('Cookies:', req.cookies); // 쿠키 확인
  next();
});

// Routes 설정
app.use('/api/users', require('./routes/users'));  // 사용자 관련 라우트
app.use('/api/auth', require('./routes/auth'));  // 인증 관련 라우트
app.use('/api', require('./routes/protected'));  // 보호된 경로


// 서버 시작
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





