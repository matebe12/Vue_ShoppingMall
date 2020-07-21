import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
require('dotenv').config();

MybatisMapper.createMapper([`${MapperPath}/reply/ReplyMapper.xml`]);

router.post('/insertReply', async(req,res) => {
    const reqData = req.body;
    const query = MybatisMapper.getStatement('replyMapper', 'insertReply', reqData, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(query);
            console.log(error);
            return res.status(500);
        }
        console.log(results);
        return res.status(200).send({
            results
        });
    });
});

router.post('/getReplyAll', async (req, res) => {
    const reqData = req.body;
    console.log('댓글불러오기 함수');
    
    const query = MybatisMapper.getStatement('replyMapper', 'getReplyAll', reqData, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }
        console.log(results);
        return res.status(200).send({
            results
        });
    });
});

router.post('/updateReply', async (req, res) => {
    const reqData = req.body;
    const query = MybatisMapper.getStatement('replyMapper', 'updateReply', reqData, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            
            console.log(error);
            return res.status(500);
        }
        console.log(results);
        return res.status(200).send({
            results
        });
    });
});

router.post('/deleteReply', async (req, res) => {
    const reqData = req.body;
    const query = MybatisMapper.getStatement('replyMapper', 'deleteReply', reqData, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }
        console.log(results);
        return res.status(200).send({
            results
        });
    });
});


export default router;