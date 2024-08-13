const express = require('express');
const router = express.Router();
const { PopularMovie, LatestMovie, GenreMovie } = require('../models/Movie'); // 모델 경로 수정 필요

// 리뷰 추가 API
router.post('/add', async (req, res) => {
  console.log('Request body', req.body);
  
  const { movieTitle, userId, userName, comments } = req.body;

  if (!movieTitle || !userId || !userName || !comments) {
    return res.status(400).json({ message: '모든 필드가 필요합니다.' });
  }


  try {
    // 영화 모델을 사용하여 영화 찾기
    const movie = await PopularMovie.findOne({title: movieTitle}) || 
                  await LatestMovie.findOne({title: movieTitle}) || 
                  await GenreMovie.findOne({title: movieTitle});

    if (!movie) {
      console.log('movie 없음');
      return res.status(404).json({ message: '영화를 찾을 수 없습니다.' });
    }

    console.log('movie는 있음', movie);

    // 댓글 배열이 없는 경우 초기화
    if (!movie.comments) {
      movie.comments = [];
    }

    // 댓글 추가
    movie.comments.push({
      userId,
      userName,
      comments
    });

    console.log('리뷰 추가 전:', movie.comments);
    await movie.save();
    console.log('리뷰 저장 완료');

    res.status(200).json({ message: '리뷰가 성공적으로 추가되었습니다.' });
  } catch (error) {
    console.error('리뷰 추가 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
});


// 특정 영화의 리뷰 가져오기 API
router.get('/:title/:userId', async (req, res) => {
  const { title, userId } = req.params;
  const decodedTitle = decodeURIComponent(title);

    try {
        // 영화 모델을 사용하여 title로 영화 찾기
        const movie = await PopularMovie.findOne({ title: decodedTitle }) || 
                      await LatestMovie.findOne({ title: decodedTitle }) || 
                      await GenreMovie.findOne({ title: decodedTitle });

        if (!movie) {
            return res.status(404).json({ message: '영화를 찾을 수 없습니다.' });
        }

        // 사용자가 작성한 리뷰
        const myReview = movie.comments.filter(comment => comment.userId.toString() === userId);

        // 다른 사용자가 작성한 리뷰
        const otherReviews = movie.comments.filter(comment => comment.userId.toString() !== userId);

        res.status(200).json({ myReview, otherReviews });
    } catch (error) {
        console.error('리뷰 가져오기 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류 발생' });
    }
});

module.exports = router;
