const express = require('express');
const router = express.Router();
const { expressjwt: expressJwt } = require('express-jwt');
const dotenv = require('dotenv');

dotenv.config(); // 환경 변수 로드


const secret = process.env.JWT_SECRET;

// JWT 검증 미들웨어 설정
router.use(expressJwt({
  secret: secret,
  algorithms: ['HS256'],
  getToken: (req) => req.cookies.token // 쿠키에서 토큰을 가져옴
}).unless({ path: ['/api/auth/login', '/api/users'] }));


// 보호된 경로
router.get('/protected', (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
