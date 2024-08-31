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
  * **POST /api/users**: 사용자 정보를 등록하거나 업데이트
  * **POST /api/auth/login**: 로그인 처리 및 JWT 발급
  * **POST /api/auth/logout**: 로그아웃 처리

**2. 영화 관리**
  * **GET /api/movies/popular**: 인기 영화 목록을 가져옴
  * **GET /api/movies/latest**: 최신 영화 목록을 가져옴
  * **GET /api/movies/genre** : 특정 장르의 영화 목록을 가져옴
  * **GET /api/movies/search**: 영화 검색 기능을 제공
  * **GET /api/movies/** : 특정 영화의 상세 정보를 가져옴
    
**3. 추천 시스템**
  * **POST /api/recommendations**: 사용자의 찜한 영화 및 즐겨찾기 영화 기반으로 추천 영화 목록을 제공
  * **POST /api/recommendGenres/** : 사용자의 장르 선호도를 기반으로 추천 영화 목록을 제공
    
**4. 리뷰 관리**
  * **POST /api/reviews/add**: 영화에 리뷰를 추가
  * **GET /api/reviews/:title/:userId** : 특정 영화에 대한 사용자의 리뷰를 조회
  * **POST /api/reviews/update**: 리뷰를 업데이트
  * **DELETE /api/reviews/delete**: 리뷰를 삭제
    
**5. 보호된 라우트**
  * **GET /api/protected**: 인증이 필요한 보호된 경로에 접근


    
### 문제 해결
영화 리뷰 어플리케이션을 구현하면서 발생한 문제들과 이를 해결하기 위해 한 방법들을 기술해보려고 한다.
* **🟥문제 1: **
  
🫁 **문제 내용**:

🫁 **해결 방법**:  

🫁 **결론** : 
**블로그 참고** : 


**🟥문제 2: **  

🫁 **문제 내용**: 

🫁 **해결 방법**:  

🫁 **결론**:   
**블로그 참고** : 


**🟥문제 3: **  

🫁 **문제 내용**: 

🫁 **해결 방법**:   

🫁 **결론** : 
**블로그 참고** : 


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
