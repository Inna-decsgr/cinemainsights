const express = require('express');
const { expressjwt: expressJwt } = require('express-jwt');
const dotenv = require('dotenv');

dotenv.config(); // 환경 변수 로드


const secret = process.env.JWT_SECRET;
const router = express.Router();

// JWT 검증 미들웨어 설정
router.use(expressJwt({
  secret: secret,
  algorithms: ['HS256'],

  getToken: (req) => {
  return req.cookies.accessToken;
}  // 쿠키에서 토큰을 가져옴
}).unless({ path: ['/api/auth/login', '/api/users', '/api/movies/*', '/api/auth/logout', '/api/search'] }));


// 보호된 경로
router.get('/', (req, res) => {
  res.send('This is a protected route');
});


module.exports = router;

