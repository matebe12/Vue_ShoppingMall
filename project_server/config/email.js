import email from 'nodemailer';
require('dotenv').config();


const transpoter = email.createTransport({
    service: 'gmail',
    auth: {
        user: 'matebe12@gmail.com',  // gmail 계정 아이디를 입력
        pass: process.env.EMAIL_PW          // gmail 계정의 비밀번호를 입력
    }
});

let mailOptions = {
    from: 'matebe12@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
    to: email,                     // 수신 메일 주소
    subject: 'Sending Email using Node.js',   // 제목
    text: 'That was easy!'  // 내용
};

export { transpoter, mailOptions};