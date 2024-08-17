const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config(); // 환경 변수 로드

const secret = process.env.JWT_SECRET;

// JWT 생성 함수
function generateToken(user) {
  return jwt.sign({ id: user.uid, email: user.email }, secret, { expiresIn: '7h' });
}

// 사용자 로그인 라우트: 로그인 시 쿠키에 JWT를 저장
router.post('/login', (req, res) => {
  const user = req.body;
  const token = generateToken(user);
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,  // 로컬 환경에서는 false, 프로덕션에서는 true로 변경
    sameSite: 'lax'   // 또는 'strict' 또는 'none'
  }); 
  res.status(200).json({ message: 'Logged in successfully', token });
});

// 로그아웃 시 쿠키를 삭제
router.post('/logout', (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
});

module.exports = router;


