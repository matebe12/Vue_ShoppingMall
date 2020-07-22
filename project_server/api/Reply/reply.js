import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
import { Method } from '../httpMethod.js';
require('dotenv').config();

MybatisMapper.createMapper([`${MapperPath}/reply/ReplyMapper.xml`]);
var mapperId = 'replyMapper';
router.post('/insertReply', async(req,res) => {
    const reqData = req.body;
    try {
        let result = await Method(mapperId, 'insertReply', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.post('/getReplyAll', async (req, res) => {
    const reqData = req.body;
    try {
        let result = await Method(mapperId, 'getReplyAll', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

});

router.post('/updateReply', async (req, res) => {
    const reqData = req.body;

    try {
        let result = await Method(mapperId, 'updateReply', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.post('/deleteReply', async (req, res) => {
    const reqData = req.body;

    try {
        let result = await Method(mapperId, 'deleteReply', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});


export default router;