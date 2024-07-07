const express = require('express');
const path = require('path');
const app = express();

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 요청 디버깅
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

// /main 경로로 접근할 때 index.html 파일 제공
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(err.status).end();
        }
    });
});

// 서버 실행
app.listen(5500, () => {
    console.log('Server is running on http://127.0.0.1:5500');
});