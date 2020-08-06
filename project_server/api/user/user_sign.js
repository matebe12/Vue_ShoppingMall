import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
import bcrypt from 'bcrypt';
require('dotenv').config();
import jwt from 'jsonwebtoken';
import { jwtObj } from '../../config/jwt.js';
import { upload } from '../../config/upload.js';
import { Method } from '../httpMethod.js';
import { mailOptions, transpoter } from '../../config/email.js';
import Validation from '../../util/Validation.js';
import path from 'path';
MybatisMapper.createMapper([path.join(__dirname, '../../mappers/user/UserMapper.xml')]);
var mapperId = 'userMapper';

router.post('/test', async (req,res) => {
    console.log(req.headers.authorization);
    return res.send(req.headers.authorization);
});

router.post('/signup', async (req, res) => {
    try {
        let reqData = req.body;
        if (req.body == null) {
            res.status(400);
        }
        bcrypt.hash(reqData.USER_PW, 10, async (error, hashedPassword) => {
            if (error) {
                console.log(error);
            } else {
                reqData.USER_PW = hashedPassword;
                let result = await Method(mapperId, 'insertUser', reqData, format);
                return res.status(200).send(result);
            }
    })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.post('/checkId', async(req,res) => {
    console.log(req.body);
    const query = MybatisMapper.getStatement('userMapper', 'checkId', req.body, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        } else {
            return res.status(200).send(results);
        }
    });
});

router.post('/checkEmail', async (req, res) => {
    const query = MybatisMapper.getStatement('userMapper', 'checkEmail', req.body, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        } else {
            return res.status(200).send(results);
        }
    });
});


router.post('/login', (req,res) => {
    var resultData = {};
    const query = MybatisMapper.getStatement('userMapper', 'selectLoginUser', req.body, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            if (results.length < 1) {
                resultData.searchUser = false;
                res.status(400);
               return res.json('존재하지 않는 아이디입니다.');
            } else {
                bcrypt.compare(req.body.USER_PW, results[0].USER_PW, (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json('Internal Server Error');
                    } else {
                        resultData.searchUser = true;
                        resultData.isMatchedPw = result;
                        if (!resultData.searchUser || !resultData.isMatchedPw){
                            res.status(400).json('아이디 및 비밀번호를 확인해주세요.');
                        } else {
                            if (result){
                                const token = jwt.sign({
                                    USER_ID: result[0],  //페이로드
                                },jwtObj.secret, {
                                 expiresIn: '30m' // 토큰 유지 시간 
                                });
                                res.cookie('token', token);
                                res.cookie('verify', results[0].USER_VERIFY);
                                res.cookie('user', JSON.stringify(results[0]));
                                return res.status(200).send({
                                    resultData,
                                    token,
                                    results
                                }); 
                            }
                            
                        }                       
                    }
                });
            }
        }
    });
});

router.post('/loginKakao', (req,res) => {
    var response = {};
    const query = MybatisMapper.getStatement('userMapper', 'selectLoginUser', req.body, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        } else {
            if (results.length < 1) {
                req.body.ISSNS = 'kakao';
                insertUserKakao('userMapper', 'insertUserKakao', req.body, format);
            } 

            const query1 = MybatisMapper.getStatement('userMapper', 'selectLoginUserKakao', req.body, format);
            let resData = {};
            connection.query(query1, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    resData.error = error
                    res.status(500).send(resData.error);
                }

                resData.success = results;
                res.cookie('token', req.body.ACCESS_TOKEN);
                res.cookie('verify', resData.success[0].USER_VERIFY);
                res.cookie('user', JSON.stringify(resData));
                return res.status(200).send(resData.success[0]);
            });
            
            
        }
    });
});

const  insertUserKakao = async (mapperId, queryId, reqData, format) => {
    const query = MybatisMapper.getStatement(mapperId, queryId, reqData, format);
    let resData = {};
    connection.query(query, (error, results, fields) => {
        if(error){
            console.log(error);
            resData.error = error
            return resData;
        }
        
        resData.success = results;
        return resData;
    });
    return resData;
}

router.post('/getUserList', async(req, res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;
    const query = MybatisMapper.getStatement('userMapper', 'getUserList', reqData, format);
    connection.query(query, (error, results1, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }
        const query = MybatisMapper.getStatement('userMapper', 'getUserListCount', reqData, format);
    connection.query(query, (error, results2, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }
        return res.status(200).send({
            results2,
            results1
        });
        });       
    });
});

router.post('/getPw', async (req, res) => {
    const reqData = req.body;
    console.log(reqData);
    mailOptions.to = reqData.USER_EMAIL;
    mailOptions.subject = '안녕하세요. 쇼핑몰입니다.';
    mailOptions.text = '안녕하세요. 쇼핑몰입니다. 회원님의 임시 비밀번호는 1234 입니다.';

    const USER_PW = '1234';
    bcrypt.hash(USER_PW, 10, async (error, hashedPassword) => { 
        transpoter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
                return res.status(500).send(error);
            }
            else {
                reqData.USER_PW = hashedPassword;
                const query = MybatisMapper.getStatement('userMapper', 'updateUserPw', reqData, format);
                connection.query(query, (error, results2, fields) => {
                    if(error){
                        console.log(error);
                        return res.status(500).send(error);
                    }
                    return res.status(200).send({ result: 1 });
                });
                
            }
        })
    });
});

router.post('/getUserDetail', async (req, res) => {
    let reqData;
    if (req.body != null) {
        reqData = req.body;
    }
    console.log('reqData : ', reqData);

    const query = MybatisMapper.getStatement('userMapper', 'getUserDetail', reqData, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return 500;
        }
        console.log(results);
        return res.status(200).send({
            results
        });
    });
});

router.post('/updateUser', upload.any(), async (req, res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    let reqData = req.body;
    console.log(req.files);
    if (req.hasOwnProperty('files'))
    reqData.USER_THUMBNAIL = `${req.files[0].filename}`;   
    console.log('reqData : ', req);

    const query = MybatisMapper.getStatement('userMapper', 'updateUser', reqData, format);
    connection.query(query, (error, results2, fields) => {
        console.log(query);
        if (error) {
            console.log(error);
            return 500;
        }
        console.log(results2);
        return res.status(200).send({
            results2
        });
    });
});

router.post('/deleteUser', async (req, res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body.ITEM;
    let resData = [];
    
    for(let i =0; i< reqData.length; i++){    
        console.log(reqData[i].USER_ID);    
        const query = MybatisMapper.getStatement('userMapper', 'deleteUser', reqData[i], format);
        connection.query(query, (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500);
            }
            resData.push(results);
        });
    };
        return res.status(200).send({
            resData
        });
    
});

export default router;