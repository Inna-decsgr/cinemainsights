# CinemaInsights

### 프로젝트 이름
cinemainsights

### 프로젝트 설명
'cinemainsights'는 다양한 영화 정보를 제공하는 Vue.js 기반의 웹 어플리케이션이다. 사용자는 실시간 인기 영화, 최신 영화, 장르별 영화 등을 검색하고, 영화에 대한 리뷰를 작성하거나 즐겨찾기에 추가할 수 있다. 또한, 사용자 맞춤형 영화 추천 기능도 제공된다. 이 어플리케이션은 Vue.js로 구성된 프론트엔드와 MongoDB를 기반으로 한 백엔드로 이루어져 있다.

### 프로젝트 목표
'cinemainsights'는 아래와 같은 목표를 가지고 개발되었다.
1. **포괄적인 영화 정보 제공** : 최신 영화, 인기 영화, 다양한 장르의 영화를 쉽게 검색하고 탐색할 수 있도록 한다.
2. **개인화된 사용자 경험** : 사용자 맞춤형 영화 추천 기능을 통해 개인의 취향에 맞는 영화를 추천한다.
3. **리뷰 및 즐겨찾기 기능** : 사용자가 영화에 대한 리뷰를 작성하고, 좋아하는 영화를 즐겨찾기에 추가하여 개인화된 영화 목록을 관리할 수 있게 한다.
4. **효율적인 상태 관리** : Vuex를 활용해서 사용자 인증 상태, 영화 데이터, 검색 결과 등의 상태를 효율적으로 관리한다.
5. **모던 웹 기술 활용** : 최신 웹 기술과 라이브러리(vue.js, firebase) 활용을 통해 사용자에게 매끄럽고 직관적인 인터페이스를 제공한다.

### 사용 기술
* **Node.js**: 서버 사이드 자바스크립트 런타임
* **Express.js**: Node.js를 위한 웹 애플리케이션 프레임워크
* **MongoDB**: NoSQL 데이터베이스.
* **Mongoose**: MongoDB와의 연결을 위한 ODM(Object Data Modeling) 라이브러리
* **Axios**: HTTP 요청을 보내기 위한 Promise 기반의 HTTP 클라이언트
* **jsonwebtoken**: JSON Web Tokens을 사용한 인증 처리
* **dotenv**: 환경 변수 관리.
* **cors**: Cross-Origin Resource Sharing(CORS) 처리

### 구현 사항
* **사용자 관리** :
  * 사용자 등록 및 정보 저장
  * 사용자에 대한 즐겨찾기 및 찜 기능 구현
* **영화 관리** :
  * 인기 영화, 최신 영화, 장르별 영화 정보 제공
  * 영화 검색 및 상세 정보 제공
* **추천 시스템** :
  * 사용자 기반의 추천 영화 시스템
  * 장르 기반 추천 시스템
* **리뷰 관리** :
  * 영화에 대한 리뷰 추가, 조회, 업데이트, 삭제 기능 제공
* **보호된 라우트** :
  * JWT(Json Web Token) 인증을 사용해서 보호된 API 엔드포인트 제공
 
### 주요 내용
**1. 사용자 관리**
  * **POST /api/users**: 사용자의 정보를 등록하거나 업데이트하는 API. 새 사용자 등록이나 기존 사용자 정보 수정 시 사용되고 요청 본문에는 사용자 관련 정보(이름, 이메일 등)를 포함한다.
  * **POST /api/auth/login**: 사용자가 로그인할 수 있는 API. 성공적으로 로그인하면 JWT(Json Web Token)가 발급되어 인증이 필요한 다른 API 요청에 사용될 수 있다.
  * **POST /api/auth/logout**: 현재 로그인한 사용자의 세션을 종료하고 JWT를 무효화하는 API. 사용자는 로그아웃 후 인증된 요청을 보낼 수 없다.

**2. 영화 관리**
  * **GET /api/movies/popular**: 현재 인기 있는 영화 목록을 가져오는 API. 영화의 기본 정보(제목, 포스터, 개요 등)를 포함하여 사용자에게 인기 영화를 소개한다.
  * **GET /api/movies/latest**: 최신 개봉된 영화 목록을 가져오는 API. 최신 영화의 정보를 제공하여 사용자에게 최신 영화 트렌드를 소개한다.
  * **GET /api/movies/genre** : 특정 장르의 영화 목록을 가져오는 API. 사용자가 관심 있는 장르를 선택하면 해당 장르의 영화 목록을 제공한다.
  * **GET /api/movies/search**: 영화 제목이나 다른 검색어를 기반으로 영화를 검색할 수 있는 API. 사용자가 입력한 검색어에 맞는 영화 목록을 반환한다.
  * **GET /api/movies/** : 특정 영화의 상세 정보를 가져오는 API. 영화 ID를 통해 영화의 세부사항(제목, 개요, 감독, 출연진 등)을 조회할 수 있다.
    
**3. 추천 시스템**
  * **POST /api/recommendations**: 사용자가 찜한 영화 및 즐겨찾기한 영화를 기반으로 맞춤형 추천 영화 목록을 제공하는 API. 추천 알고리즘을 통해 사용자에게 적합한 영화를 추천한다.
  * **POST /api/recommendGenres/** : 코사인 유사도를 사용하여 사용자의 장르 선호도를 분석한 후 그에 맞는 추천 영화 목록을 제공하는 API. 사용자가 좋아하는 장르에 따라 영화를 추천한다.
    
**4. 리뷰 관리**
  * **POST /api/reviews/add**: 영화에 대한 사용자의 리뷰를 추가하는 API. 사용자는 리뷰 내용을 작성하고 영화 ID와 함께 제출할 수 있다.
  * **GET /api/reviews/:title/:userId** : 특정 영화에 대해 사용자가 작성한 리뷰를 조회하는 API. 영화 제목과 사용자 ID를 기반으로 해당 사용자의 리뷰를 가져온다.
  * **POST /api/reviews/update**: 기존에 작성한 리뷰를 업데이트하는 API. 리뷰 내용 수정이 필요할 때 사용된다.
  * **DELETE /api/reviews/delete**: 작성한 리뷰를 삭제하는 API. 사용자는 자신의 리뷰를 삭제할 수 있다.
    
**5. 보호된 라우트**
  * **GET /api/protected**: 인증이 필요한 보호된 경로에 접근할 수 있는 API. 이 경로는 로그인된 사용자만 접근할 수 있으며, 인증된 사용자만 사용할 수 있는 기능을 제공한다.


    
### 문제 해결
영화 리뷰 어플리케이션을 구현하면서 발생한 문제들과 이를 해결하기 위해 사용한 방법들을 기술해보려고 한다.
* **🟥문제 1:**
```js
MongooseError: The uri parameter to openUri() must be a string, got "undefined". Make sure the first parameter to mongoose.connect() or mongoose.createConnection() is a string.
  method: 'get',
  url: 'https://api.themoviedb.org/3/movie/popular?api_key=undefined',
  data: undefined
  },
  data: {
  status_code: 7,
  status_message: 'Invalid API key: You must be granted a valid key.',
  success: false
}

```
  
🫁 **문제 내용**:MongoDB URL과 TMDb API 키가 정의되지 않아서 데이터베이스 연결과 API 요청이 실패했다. 에러 메시지는 다음과 같다.
* MongoDB: URI 파라미터가 정의되지 않아 연결 실패
* TMDb API: 유효하지 않은 API 키로 요청 실패

🫁 **해결 방법**:  
**1. .env 파일 위치 확인**: .env 파일은 프로젝트의 루트 디렉토리에 위치하고 있고, fetchAndStoreMovies.js 파일은 service 폴더 내에 있다. 기본적으로 `dotenv` 패키지는 현재 작업 디렉토리에서 .env 파일을 찾기 때문에, 올바른 위치를 지정해 주어야 한다.

**2. 경로 수정**: fetchAndStoreMovies.js 파일에서 .env 파일을 올바르게 로드하기 위해 `dotenv` 패키지의 `config` 메서드에 경로를 명시적으로 설정했다.
```js
require('dotenv').config({ path: '../.env' });
```
이렇게 하면 service 폴더 내의 스크립트가 backend 루트에 있는 .env 파일을 올바르게 로드할 수 있다.  

**3. 재실행 및 검증**: 경로를 수정한 후, 스크립트를 다시 실행하여 MongoDB에 영화 데이터가 정상적으로 저장되는지 확인했다. 모든 환경 변수가 올바르게 로드되었고, 에러 없이 데이터가 처리되었다.

🫁 **결론** : 환경 변수를 올바르게 설정하고 경로를 정확하게 지정하는 것이 중요하다는 것을 알게 되었으며, 이를 통해 문제를 해결할 수 있었다.  
**블로그 참고** : https://velog.io/@kimina/%EC%98%81%ED%99%94-%EB%A6%AC%EB%B7%B0-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%985-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EA%B5%AC%EC%B6%95-%EB%B0%8F-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B0%80%EC%A0%B8%EC%99%80%EC%84%9C-%EB%B3%B4%EC%97%AC%EC%A3%BC%EA%B8%B0



**🟥문제 2: 중복된 데이터가 있음**  

🫁 **문제 내용**: 추천 시스템에서 중복된 영화가 포함되는 문제를 발견했다. 추천 목록에 중복된 영화 제목이 포함되어 사용자에게 비효율적인 정보를 제공하고 있었다. 기존 코드에서는 추천 목록이 유사도에 따라 정렬되었지만, 중복된 영화 제목이 포함된 상태로 결과를 반환했다. 이로 인해 사용자에게 동일한 영화가 여러 번 나타나며, 추천 시스템의 유용성이 감소했다.

🫁 **해결 방법 : 중복 제거 및 유사도 기반 정렬**  
추천 목록에서 중복된 영화 제목을 제거하고, 유사도에 따라 정렬하여 최적의 추천 목록을 생성하는 방법을 적용했다.
```js
const recommendations = allMovies.map(movie => {
    const movieGenres = movie.genres || [];
    const movieVector = createUserGenreVector(movieGenres, genreMap, false);
    const similarity = cosineSimilarity(userVector, movieVector);
    
    return { movie, similarity };
  });

const movieMap = new Map();
recommendations.forEach(item => {
    const title = item.movie.title;
    if (!movieMap.has(title) || movieMap.get(title).similarity < item.similarity) {
      movieMap.set(title, item); 
    }
});

const uniqueRecommendations = Array.from(movieMap.values())
    .sort((a, b) => b.similarity - a.similarity);
  
res.json(uniqueRecommendations);
```
* **중복 제거를 위한 처리** : `Map` 객체를 사용해서 중복된 영화 제목을 제거하고, 유사도가 높은 항목만 남기도록 수정했다.
* **중복 제거 후 배열 생성** : `Array.from`과 `sort`를 사용해서 중복을 제거하고 유사도에 따라 정렬된 추천 목록을 생성했다.


**🟥문제 3: 영화 추천 시스템의 ID 일관성 문제**  

🫁 **문제 내용**: 추천 영화의 상세 페이지로 이동할 때 영화의 ID가 일관되지 않아 해당 영화의 정보를 받아올 수 없었다. 문제의 원인은 추천 영화와 장르별 추천 영화가 TMDB 전체 영화 데이터에서 추출된 데이터의 ID를 사용하는 반면, 기존의 최신 영화와 인기 영화 데이터는 다른 ID 체계를 사용하고 있기 때문이다. 이로 인해, ID 기반으로 정보를 조회할 때 일관되지 않는 ID로 인해 문제가 발생했다.

🫁 **해결 방법 : 제목 기반 ID 일관성 유지** 
제목이 동일한 영화들에 대해 ID를 일관되게 유지하기 위해, 인기 영화, 최신 영화, 장르별 영화 데이터를 활용하여 일관된 ID를 할당했다.
```js
const { PopularMovie, LatestMovie, GenreMovie, Movies } = require('../models/Movie');

router.post('/:userId', async (req, res) => {
  const likedGenres = likedMovies.flatMap(movie => movie.genres);
  const bookmarkedGenres = bookmarkedMovies.flatMap(movie => movie.genres);

  const allMovies = await Movies.find();
  const [popularMovies, genreMovies, latestMovies] = await Promise.all([
    PopularMovie.find(),
    LatestMovie.find(),
    GenreMovie.find()
  ]);

  const recommendations = allMovies.map(movie => {
    const movieGenres = movie.genres || [];
    const movieVector = createUserGenreVector(movieGenres, genreMap, false);
    const similarity = cosineSimilarity(userVector, movieVector);

    const matchingMovie = popularMovies.find(m => m.title === movie.title) ||
      genreMovies.find(m => m.title === movie.title) ||
      latestMovies.find(m => m.title === movie.title);

    const movieId = matchingMovie && matchingMovie.id ? matchingMovie.id : movie._id;

    return { ...movie, movieId: movieId, similarity };
  }).filter(movie => movie !== null);

  res.json(recommendations);
});
```
* **영화 제목을 기준으로 ID 매칭** : 제목이 동일한 영화의 ID를 일관되게 유지하기 위해, 인기 영화, 장르별 영화, 최신 영화 데이터에서 매칭되는 영화를 찾고 ID를 설정했다.
* **ID 설정** : 매칭된 영화의 ID로 덮어쓰거나, 없으면 기존의 _id를 사용하여 일관된 ID를 유지했다.


🫁 **결론**: 중복된 영화 데이터를 제거하고 유사도에 따라 정렬함으로써 사용자에게 더 정확하고 유용한 추천 목록을 제공할 수 있었다. 그 결과 추천 시스템의 효율성과 사용자 경험이 향상되었다. 또한, 제목을 기준으로 ID를 일관되게 설정함으로써 영화 정보 조회 시 발생할 수 있는 ID 불일치 문제를 해결했다. 이로 통해 추천 시스템의 데이터 일관성을 유지하고, 사용자에게 정확한 정보를 제공할 수 있었다.  
**블로그 참고** : [https://velog.io/@kimina/%EC%98%81%ED%99%94-%EB%A6%AC%EB%B7%B0-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%9814-%EC%9C%A0%EC%82%AC%EB%8F%84-%EA%B3%84%EC%82%B0%ED%95%B4%EC%84%9C-%EC%98%81%ED%99%94-%EC%B6%94%EC%B2%9C2](https://velog.io/@kimina/%EC%98%81%ED%99%94-%EB%A6%AC%EB%B7%B0-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%9814-%EC%9C%A0%EC%82%AC%EB%8F%84-%EA%B3%84%EC%82%B0%ED%95%B4%EC%84%9C-%EC%98%81%ED%99%94-%EC%B6%94%EC%B2%9C2)


**🟥문제 4: JWT 만료 문제**  

🫁 **문제 내용**: JWT 토큰을 사용해서 구글 로그인 기능을 구현하고 있다. JWT 만료 기한을 1시간으로 설정해두었으나, 이로 인해 1시간마다 토큰 세션이 만료되는 문제가 발생했다. 이 문제를 해결하기 위해 만료 기간을 `{ expiresIn: '1y' }`로 변경하여 JWT 토큰의 유효 기간을 1년으로 설정했지만 아래와 같은 이유로 이 방법을 사용하지 않기로 결정했다.
 * **보안 위험 증가:** 만료 시간을 길게 설정하면 토큰이 노출되었을 때의 보안 위험이 커진다.
 * **사용자 경험 저하:** 짧은 만료 시간은 사용자가 자주 로그인을 해야 하기 때문에 사용자 경험이 나빠질 수 있다.
   
따라서 보안상과 사용자 경험을 모두 고려하여 토큰의 유효 기간을 짧게 설정하되, 자동으로 갱신하는 방법을 사용하기로 했다. 이를 위해 **Access Token**과 **Refresh Token**을 조합하는 방식을 사용할 계획이다.
동작 과정은 로그인 후, 사용자는 Access Token을 사용하여 인증된 요청을 수행하고, Access Token이 만료되면 /refresh 엔드포인트를 통해 새로운 Access Token을 발급받아 사용자 인증에 사용하는 흐름이다.

🫁 **해결 과정**  
**1. Access Token과 Refresh Token 생성 및 로그인 처리**
```js
// JWT 생성 함수(access token)
function generateAccessToken(user) {
  return jwt.sign({ id: user.uid, email: user.email }, secret, { expiresIn: '15m' }); 
}

// JWT 생성 함수(refresh token)
function generateRefreshToken(user) {
  return jwt.sign({ id: user.uid, email: user.email }, refreshSecret, { expiresIn: '7d' }); 
}
```
* 로그인 시, 사용자는 access token과 refresh token을 발급받는다.
* access token은 짧은 유효기간을 가지며, refresh token은 상대적으로 긴 유효 기간을 가진다.

  
**로그인 (`/login`)**  
로그인 후, Access Token과 Refresh Token은 쿠키에 저장되며, 클라이언트는 이후 요청에서 이 토큰들을 사용한다.

```js
router.post('/login', (req, res) => {
  const user = req.body;
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false,  
    sameSite: 'lax'   
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,  
    sameSite: 'lax'   
  });

  res.status(200).json({ message: 'Logged in successfully', accessToken, refreshToken }); 
});
```
* Access Token과 Refresh Token은 httpOnly 및 secure 속성이 설정된 쿠키에 저장하여 XSS(Cross-Site Scripting) 공격으로부터 보호할 수 있다.
* httpOnly는 클라이언트 측 스크립트에서 토큰에 접근할 수 없게 하고, secure는 HTTPS를 통해서만 쿠키가 전송되도록 보장한다.


🫁 **2. 로그아웃 처리**
**로그아웃 (`/logout`)**  
로그아웃 시에는 쿠키에 저장된 Access Token과 Refresh Token을 삭제하여 서버에서 인증 상태를 종료한다.
```js
router.post('/logout', (req, res) => {
  try {
    res.clearCookie('accessToken', { ... });
    res.clearCookie('refreshToken', { ... });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
});
```

🫁 **3. Access Token 갱신 처리**  
Access Token이 만료되면, 클라이언트는 저장된 Refresh Token을 사용하여 새로운 Access Token을 요청한다. 서버는 Refresh Token을 검증한 후 새로운 Access Token을 발급한다.  
**토큰 갱신 엔드포인트 (/refresh)**
```js
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.cookies;

  jwt.verify(refreshToken, refreshSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    const newAccessToken = generateAccessToken(user);
    res.cookie('accessToken', newAccessToken, { ... });
    res.status(200).json({ message: 'Access token refreshed', accessToken: newAccessToken, refreshToken: refreshToken });
  })
})
```
🫁 **4. Vuex 스토어에서의 사용 예제**  
Vuex 스토어에서는 refreshToken 액션을 통해 토큰 갱신을 처리하며, 만료된 Access Token을 새로운 것으로 교체한다.
```js
async refreshToken({ commit, state }) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/refresh', {
          refreshToken: state.refreshToken
        });

        const { accessToken, refreshToken } = response.data; // 서버에서 새 access token과 refresh token을 받아옴

        commit('setToken', accessToken);
        commit('setRefreshToken', refreshToken);

        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      await axios.post('http://localhost:5000/api/auth/logout');
      commit('logout');
      delete axios.defaults.headers.common['Authorization'];
    }
  },
```

🫁 **결론** : 이 접근 방식은 JSON Web Tokens (JWT)와 Refresh Tokens를 사용하여 사용자의 인증을 처리한다. JWT는 짧은 유효 기간을 가지고 있어 보안성을 강화하며, Refresh Token을 통해 세션을 연장하여 사용자 경험을 향상시킨다. 이로써 보안과 사용자 편의성을 모두 충족할 수 있는 인증 시스템을 구축할 수 있었다.  
**블로그 참고** : https://velog.io/@kimina/%EC%98%81%ED%99%94-%EB%A6%AC%EB%B7%B0-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%9815-%EC%82%AC%EC%9A%A9%EC%9E%90-jwt-%ED%86%A0%ED%81%B0-%EC%84%B8%EC%85%98-%EB%A7%8C%EB%A3%8C-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0


### 사용 방법
🥲 **1. 환경 설정**
* 프로젝트 루트 디렉토리에 .env 파일을 생성하고, 다음 환경 변수를 설정합니다
  ```
    TMDB_API_KEY=your_tmdb_api_key
    JWT_SECRET=your_jwt_secret
    PORT=5000
  ```
🥲 **2. 의존성 설치**
* 프로젝트의 루트 디렉토리에서 의존성을 설치합니다
  ```
    npm install
  ```
🥲 **3. 데이터베이스 연결**
MongoDB와의 연결을 위해 config/mongoose.js 파일에서 데이터베이스 URI를 설정합니다.

🥲 **4. 서버 실행**
  ```
    node app.js
  ```
🥲 **5. 데이터 가져오기**
영화 데이터를 TMDB API에서 가져와 MongoDB에 저장하려면 service/fetchAndStoreMovies.js 파일을 실행합니다
```
  node service/fetchAndStoreMovies.js
```
