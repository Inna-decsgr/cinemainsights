const mongoose = require('mongoose');
const dbConfig = require('./db');

const connectDB = async () => {
    try {
        await mongoose.connect(dbConfig.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB 연결 오류:', err);
        process.exit(1); // 연결 실패 시 프로세스 종료
    }
};

module.exports = connectDB;
