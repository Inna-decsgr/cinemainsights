const express = require('express');
const router = express.Router(); 
const { PopularMovie, LatestMovie, GenreMovie, Movies } = require('../models/Movie');

const genreMap = {
  28: '액션',
  12: '어드벤처',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  10402: '음악',
  10749: '로맨스',
  10752: '전쟁',
};

router.post('/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { likedMovies, bookmarkedMovies } = req.body;

  if (!userId) {
    return res.status(404).json({ message: 'User not found' });
  }

  const likedGenres = likedMovies.flatMap(movie => movie.genres);
  const bookmarkedGenres = bookmarkedMovies.flatMap(movie => movie.genres);
  const allMovies = await Movies.find();

  const [popularMovies, genreMovies, latestMovies] = await Promise.all([
    PopularMovie.find(),
    LatestMovie.find(),
    GenreMovie.find()
  ]);

  const userVector = createUserGenreVector([...likedGenres, ...bookmarkedGenres], genreMap, true);
  // console.log('User Vector:', userVector);

  const recommendations = allMovies.map(movie => {
    const movieGenres = movie.genres || [];
    const movieVector = createUserGenreVector(movieGenres, genreMap, false);
    const similarity = cosineSimilarity(userVector, movieVector);


    const matchingMovie = popularMovies.find(m => m.title === movie.title) ||
                          genreMovies.find(m => m.title === movie.title) ||
                          latestMovies.find(m => m.title === movie.title);


    const movieId = matchingMovie ? matchingMovie.id : movie._id;

    //console.log('Movie Vector', movieVector);
    //console.log('코사인 유사도', similarity);
    return { ...movie, id: movieId, similarity };
  });

  // 중복 제거를 위한 처리
  const movieMap = new Map();
  recommendations.forEach(item => {
    console.log(item);
    const title = item._doc.title;
    if (!movieMap.has(title) || movieMap.get(title).similarity < item.similarity) {
      movieMap.set(title, item); // 높은 유사도를 가진 항목으로 업데이트
    }
  });

  // 중복 제거 후 배열 생성
  const uniqueRecommendations = Array.from(movieMap.values())
    .sort((a, b) => b.similarity - a.similarity);
  
  res.json(uniqueRecommendations);
});



function createUserGenreVector(genres, genreMap, isUserVector = true) {
  const genreVector = Array(Object.keys(genreMap).length).fill(0);

  genres.forEach(genre => {
    const index = Object.keys(genreMap).indexOf(genre.toString());
    if (index !== -1) {
      if (isUserVector) {
        genreVector[index] += 1; // 사용자의 경우, 장르 빈도를 기록
      } else {
        genreVector[index] = 1;  // 영화의 경우, 장르 존재 여부를 기록
      }
    }
  });

  return genreVector;
}

// 코사인 유사도 계산
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((acc, curr, idx) => acc + curr * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((acc, curr) => acc + curr ** 2, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((acc, curr) => acc + curr ** 2, 0));
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}


module.exports = router;