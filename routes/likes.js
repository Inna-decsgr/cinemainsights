const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 찜하기 기능을 처리하는 POST 요청
router.post('/', async (req, res) => {
  try {
    const { uid, movieId, title, imageUrl } = req.body;

    if (!uid || !movieId || !title || !imageUrl) {
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
    const existingLikeIndex = user.likes.findIndex(like => like.movieId === movieId);

    if (existingLikeIndex === -1) {
      user.likes.push({ movieId, title, imageUrl });
    } else {
      // 이미 좋아요가 있는 경우, 업데이트할 수도 있습니다.
      user.likes[existingLikeIndex] = { movieId, title, imageUrl };
    }

    await user.save();
    res.status(200).json({ message: '좋아요 성공!' });
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
