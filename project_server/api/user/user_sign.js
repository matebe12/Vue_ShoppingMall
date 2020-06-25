import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
import bcrypt from 'bcrypt';
require('dotenv').config();
import jwt from 'jsonwebtoken';
import { jwtObj } from '../../config/jwt.js';

MybatisMapper.createMapper([`${MapperPath}/user/UserMapper.xml`]);




router.post('/signup', (req, res) => {
    let reqData = req.body;
    if(req.body == null){
        res.status(400);
    }
    bcrypt.hash(reqData.USER_PW, 10, (error, hashedPassword) => {
        if (error) {
            console.log(error);
        } else {
            console.log('else 맨');
            reqData.USER_PW = hashedPassword;
            console.log(reqData.USER_PW);

            const query = MybatisMapper.getStatement('userMapper', 'insertUser', reqData, format);

            connection.query(query, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.status(500);
                }
                console.log(results);
                 res.send(results);
                 res.status(200);
            });
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
                console.log('유저를 찾을 수 없음');
                resultData.searchUser = false;
                res.status(400);
               return res.send(resultData);
            } else {
                bcrypt.compare(req.body.USER_PW, results[0].USER_PW, (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json('Internal Server Error');
                    } else {
                        console.log(result);
                        resultData.searchUser = true;
                        resultData.isMatchedPw = result;
                        console.log(`resultData : ${resultData.searchUser}`);
                        if (!resultData.searchUser || !resultData.isMatchedPw){
                            console.log('false 되야함');
                            res.status(400).json('Bad Request please check your account.');
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

export default router;