const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 사용자 스키마 정의
const userSchema = new Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  photoURL: { type: String }
}, { collection: 'User' }); // 사용자 정의 컬렉션 이름);

// User 모델 생성
const User = mongoose.model('User', userSchema);

module.exports = User;

