const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;

dotenv.config(); // 환경 변수 로드

// Routes
const userRoutes = require('./api/users');

const app = express();


// CORS 설정
app.use(cors({
  origin: 'http://localhost:8080', // 프론트엔드 주소
  credentials: true
}));

// Body parser 미들웨어
app.use(bodyParser.json());

// DB 설정
const db = process.env.MONGO_URI; // 환경 변수에서 MongoDB URI 로드

// MongoDB랑 연결하기
mongoose.connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);  // 올바른 라우트 경로

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
