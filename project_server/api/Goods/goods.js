import { Router } from 'express';
const router = Router();
import {upload} from '../../config/upload.js';
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
import {Method} from '../httpMethod.js';
require('dotenv').config();

MybatisMapper.createMapper([`${MapperPath}/user/GoodsMapper.xml`]);

var mapperId = 'goodsMapper';


router.get('/category/:reqData', async (req, res) => {
    try {
        const reqData = req.params;
        let result = await Method(mapperId, 'getCategory', reqData, format);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/InsertGoods', upload.any(), async (req,res) => {
    const reqData = req.body;
    reqData.GDS_IMG = `${req.files[0].filename}`;
    try {
        let result = await Method(mapperId, 'insertGoods', reqData, format);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/getGoodsList', async (req, res) => {
    let reqData;
    if (req.body != null) {
        reqData = req.body;
    }
    console.log(reqData);
    try {
       let result = await Method(mapperId, 'getGoodsList', reqData, format);
        let result1 = await Method(mapperId, 'getGoodsListCount', reqData, format);
        res.status(200).send({result, result1});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
router.post('/updateGoods', upload.any(), async (req,res) => {
    const reqData = req.body;
    console.log(reqData);
    if(req.files.length > 0){
        reqData.GDS_IMG = `${req.files[0].filename}`;    
    }
    reqData.GDS_IMG = '';
    try {
        const result = await Method(mapperId, 'updateGoods', reqData, format); 
        res.status(200).send(result);  
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/getCategoryList', async (req, res) => {
    try {
        let result = await Method(mapperId, 'getCategoryList', null, format);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

router.post('/deleteGoods', async (req, res) => {
    try {
        const result = await Method(mapperId, 'deleteReply', req.body, format);
        const result1 = await Method(mapperId, 'deleteGoods', req.body, format);
        res.status(200).send({result,result1});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/getGoodsOne/:gds_num', async (req,res) => {
    let reqData;
    console.log(req.params);
    
    if (req.params.gds_num != null) {
        reqData = req.params;
    } else {
        reqData = req.params.gds_num = null;
    }
    try {
        let result = await Method(mapperId,'getGoodsOne', reqData, format);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/upload', upload.any(), async(req, res) => {
    console.log(req.body);
});


export default router;