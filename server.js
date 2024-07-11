const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3000;
const fs = require('fs');

// Body-parser middleware 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 세션 설정
app.use(session({
    secret: '1234', // 비밀 키 설정
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 * 24} // 세션 만료 시간 설정 (예: 30분)
}));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 로그인 페이지 제공
app.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/search');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});

// 로그인 처리
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 간단한 사용자 검증 (예시)
    const validUsername = 'aaa';
    const validPassword = 'aaa';

    if (username === validUsername && password === validPassword) {
        req.session.loggedIn = true; // 세션에 로그인 상태 저장
        res.redirect('/search'); // 로그인 성공 시 /search 경로로 리디렉션
    } else {
        res.send('로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
    }
});

// 로그인 상태를 확인하는 미들웨어
function checkLogin(req, res, next) {
    if (req.session.loggedIn) {
        next(); // 로그인 상태라면 다음 미들웨어로 이동
    } else {
        res.redirect('/login'); // 로그인 상태가 아니라면 로그인 페이지로 리디렉션
    }
}


// /search 경로에서 search.html 제공 (로그인 확인 미들웨어 사용)

var directoryPath ='./sample_db';

app.get('/search', checkLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));

});

// 파일 리스트 제공
app.get('/filelist', (req, res) => {
    fs.readdir(directoryPath, (err, fileList) =>{
        console.log("서버파일명");
        console.log(fileList);
        res.json(fileList);
    });
  });





// 기본 경로 리디렉션 (로그인 페이지로)
app.get('/', (req, res) => {
    res.redirect('/login');
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});



// 


/*

// HTML 파일을 제공하는 라우트
// app.get('/main', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// 파일 목록을 제공하는 API
// 파일 목록을 제공하는 API

// app.get('/search', (req, res) => {
//     fs.readdir(directoryPath, (err, files) => {
//         if (err) {
//             return res.status(500).send('Unable to scan directory: ' + err);
//         }
//         console.log('Files in directory:', files); // 파일 목록을 콘솔에 출력
//         res.json(files);
//     });
// });
*/
