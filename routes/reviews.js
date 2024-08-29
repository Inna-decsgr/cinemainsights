const express = require('express');
const router = express.Router();
const { PopularMovie, LatestMovie, GenreMovie } = require('../models/Movie'); 

// 리뷰 추가 API
router.post('/add', async (req, res) => {
  const { movieTitle, userId, userName, comments } = req.body;

  if (!movieTitle || !userId || !userName || !comments) {
    return res.status(400).json({ message: '모든 필드가 필요합니다.' });
  }


  try {
    const movie = await PopularMovie.findOne({title: movieTitle}) || 
                  await LatestMovie.findOne({title: movieTitle}) || 
                  await GenreMovie.findOne({title: movieTitle});

    if (!movie) {
      return res.status(404).json({ message: '영화를 찾을 수 없습니다.' });
    }

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

    await movie.save();

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

        const myReview = movie.comments.filter(comment => comment.userId.toString() === userId);
        const otherReviews = movie.comments.filter(comment => comment.userId.toString() !== userId);

        res.status(200).json({ myReview, otherReviews });
    } catch (error) {
        console.error('리뷰 가져오기 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류 발생' });
    }
});

// 리뷰 삭제 API
router.delete('/delete', async (req, res) => {
  const { movieTitle, userId, comments } = req.body;

  if (!movieTitle || !userId || !comments) {
    return res.status(400).json({ message: '모든 필드가 필요합니다.' });
  }

  try {
    const movie = await PopularMovie.findOne({ title: movieTitle }) || 
                  await LatestMovie.findOne({ title: movieTitle }) || 
                  await GenreMovie.findOne({ title: movieTitle });

    if (!movie) {
      return res.status(404).json({ message: '영화를 찾을 수 없습니다.' });
    }

    const commentIndex = movie.comments.findIndex(
      comment => comment.userId.toString() === userId && comment.comments === comments
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
    }

    // 해당 리뷰 삭제
    movie.comments.splice(commentIndex, 1);

    await movie.save();

    res.status(200).json({ message: '리뷰가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error('리뷰 삭제 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
});

module.exports = router;
