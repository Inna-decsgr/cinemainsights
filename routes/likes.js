const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 찜하기 기능을 처리하는 POST 요청
router.post('/', async (req, res) => {
  try {
    const { uid, movieId, title, imageUrl, director, cast } = req.body;

    if (!uid || !movieId || !title || !imageUrl || !director ||!cast) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // 사용자 정보를 찾거나 생성
    let user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 사용자 데이터 업데이트: Likes 필드에 영화 정보 추가
    if (!user.likes) {
      user.likes = [];
    }

    // 이미 찜한 영화가 있는지 확인
    const existingLike = user.likes.find(like => like.title === title);

    if (existingLike) {
      // 이미 찜한 영화인 경우
      return res.status(200).json({ message: '이미 찜한 영화입니다.' });
    }

    // 새로운 찜 항목 추가
    user.likes.push({ movieId, title, imageUrl, director, cast });

    await user.save();
    res.status(200).json({ message: '찜 등록되었습니다' });
  } catch (error) {
    console.error('Error liking movie:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// 사용자 찜 목록 가져오기
router.get('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 찜한 영화 목록 반환
    res.status(200).json(user.likes);
  } catch (error) {
    console.error('Error fetching liked movies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
