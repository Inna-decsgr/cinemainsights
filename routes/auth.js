const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config(); // 환경 변수 로드

const secret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET; // 추가된 환경 변수

// JWT 생성 함수(access token)
function generateAccessToken(user) {
  return jwt.sign({ id: user.uid, email: user.email }, secret, { expiresIn: '15m' }); // 짧은 유효 기간
}

// JWT 생성 함수(refresh token)
function generateRefreshToken(user) {
  return jwt.sign({ id: user.uid, email: user.email }, refreshSecret, { expiresIn: '7d' }); // 긴 유효 기간
}


// 사용자 로그인 라우트: 로그인 시 쿠키에 JWT를 저장
router.post('/login', (req, res) => {
  const user = req.body;
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false,  // 로컬 환경에서는 false, 프로덕션에서는 true로 변경
    sameSite: 'lax'   // 또는 'strict' 또는 'none'
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,  // 로컬 환경에서는 false, 프로덕션에서는 true로 변경
    sameSite: 'lax'   // 또는 'strict' 또는 'none'
  });

  res.status(200).json({ message: 'Logged in successfully', accessToken, refreshToken }); 
});

// 로그아웃 시 쿠키를 삭제
router.post('/logout', (req, res) => {
  try {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
});

// Refresh Token을 사용해서 새로운 access token을 발급하는 라우트
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not found' });
  }

  jwt.verify(refreshToken, refreshSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });

    res.status(200).json({ message: 'Access token refreshed', accessToken: newAccessToken, refreshToken: refreshToken });
  })
})

module.exports = router;


