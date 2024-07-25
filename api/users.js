const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 사용자 정보를 저장하는 POST 요청 처리
router.post('/', async (req, res) => {
  console.log('Received data:', req.body);
  try {
    const { uid, email, displayName, photoURL } = req.body;

    if (!uid || !email || !displayName) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // 사용자 정보를 MongoDB에 저장하거나 업데이트하는 로직
    let user = await User.findOne({ uid });
    if (!user) { // 새로운 사용자 생성
      user = new User({ uid, email, displayName, photoURL });
      await user.save();
      console.log('New user created:', user);
    } else {
      user.email = email;
      user.displayName = displayName;
      user.photoURL = photoURL;
      await user.save();
      console.log('User updated:', user);
    }

    res.status(200).json(user);  // 저장된 사용자 정보를 응답으로 전송
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
