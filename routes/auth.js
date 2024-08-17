const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config(); // 환경 변수 로드

const accessTokenSecret = process.env.JWT_SECRET;  // Access Token의 비밀키
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;  // Refresh Token의 비밀키

// DB 또는 인메모리 저장소에서 Refresh Token을 관리
let refreshTokens = [];  // 서버에서 Refresh Token을 관리(DB에 저장 가능)

// Access Token 생성 함수
function generateAccessToken(user) {
  return jwt.sign({ id: user.uid, email: user.email }, accessTokenSecret, { expiresIn: '1m' });
}

// Refresh Token 생성 함수
function generateRefreshToken(user) {
  const refreshToken = jwt.sign({ id: user.uid, email: user.email }, refreshTokenSecret, { expiresIn: '7d' });
  refreshTokens.push(refreshToken);
  return refreshToken;
}

// 사용자 로그인 라우트: 로그인 시 쿠키에 JWT를 저장
router.post('/login', (req, res) => {
  const user = req.body;
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // 로컬 환경에서는 false, 프로덕션에서는 true로 변경
    sameSite: 'lax'   // 또는 'strict' 또는 'none'
  }); 

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  res.status(200).json({ message: 'Logged in successfully'});
});

// Access Token 갱신 라우트
router.post('/token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);  // Refresh Token이 유효하지 않으면 403 에러
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403); // Refresh Token이 유효하지 않으면 403 에러

    const accessToken = generateAccessToken({ uid: user.id, email: user.email });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.status(200).json({ message: 'Access token refreshed' });
  });
});

// 로그아웃 시 쿠키와 Refresh Token 삭제
router.post('/logout', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // Refresh Token을 삭제하는 작업
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);

  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;