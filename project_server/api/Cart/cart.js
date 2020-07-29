import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
import { Method } from '../httpMethod.js';
import Validation from '../../util/Validation.js';
require('dotenv').config();

var mapperId = 'cartMapper';
MybatisMapper.createMapper([`${MapperPath}/cart/CartMapper.xml`]);
router.post('/addGoodsCart', async (req, res) => {
    try {
        if(!Validation.isNull(req.headers.authorization)){
            console.log('Auth error');
            return res.status(401).json('Auth error 토큰 정보가 없습니다.');
        }
        const reqData = req.body;
        let result = await Method(mapperId, 'addGoodsCart', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.get('/getCartList/:user_id', async (req, res) => {
    let reqData;
    if (req.params.user_id != null) {
        reqData = req.params;
    } else {
        reqData = req.params.user_id = null;
    }
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    try {
        let result = await Method(mapperId, 'getCartList', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.post('/deleteCart', async (req, res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;
    if(req.body == null || req.body.USER_ID == '' || req.body.CART_NUM == ''){
        return res.status(400).send({
            msg : 'Bad Request Data'
        });
    }
    try {
        let result = await Method(mapperId, 'deleteCart', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }    
});

router.post('/insertOrder', async (req, res) => {
    const reqData = req.body;
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    if (req.body == null || req.body.USER_ID == '' || req.body.ORDER_RECIEVE == '') {
        return res.status(400).send({
            msg: 'Bad Request Data'
        });
    }
    try {
        let result1 = await Method(mapperId, 'orderInfo', reqData, format);
        let result2 = await Method(mapperId, 'orderInfo_Details', reqData, format);
        let result3 = [];
        let result4 = [];
        for (let i = 0; i < reqData.ITEM.length; i++) {
            result3.push(await Method(mapperId, 'updateGoodsStock', reqData.ITEM[i], format));
        }
        for (let i = 0; i < reqData.ITEM.length; i++) {
            result4.push(await Method(mapperId, 'deleteCart', reqData.ITEM[i], format));
        }
        return res.status(200).send({ result1, result2, result3, result4});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.post('/getOrderList', async (req, res) => {
    if (req == null || req.params == '') {
        return res.status(400).send({
            msg: 'Bad Request Data'
        });
    }
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;
    try {
        let result = await Method(mapperId, 'getOrderList', reqData, format);
        let result1 = await Method(mapperId, 'getOrderListCount', reqData, format);
        return res.status(200).send({result,result1});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }    
});

router.post('/updateOrderList', async (req, res) => {
    if (req == null || req.params == '') {
        return res.status(400).send({
            msg: 'Bad Request Data'
        });
    }
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;
    try {
        let result =[];
        for (let i = 0; i < reqData.length; i++) {
            result.push(await Method(mapperId, 'updateOrderList', reqData[i], format));
        }
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
       return res.send(500).send(error);
    }
});

router.post('/deleteOrderList', async (req, res) => {
    if (req == null || req.params == '') {
        return res.status(400).send({
            msg: 'Bad Request Data'
        });
    }
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;
    console.log(reqData);
    try {
        let result = [];
        let result1 = [];
        for (let i = 0; i < reqData.length; i++) {
            result.push(await Method(mapperId, 'deleteOrderList', reqData[i], format));
            result1.push(await Method(mapperId, 'updateGoodsStock2', reqData[i], format));
        }
        return res.status(200).send({result1,result})
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
  
});

export default router;