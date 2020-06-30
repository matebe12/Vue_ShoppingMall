import { Router } from 'express';
import multer from 'multer';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
require('dotenv').config();

MybatisMapper.createMapper([`${MapperPath}/user/GoodsMapper.xml`]);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../project_front/src/assets/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage });

router.get('/category/:reqData', async (req, res) => {
    const reqData = req.params;
    
    const query = MybatisMapper.getStatement('goodsMapper', 'getCategory', reqData, format);
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

router.post('/InsertGoods', upload.any(), async (req,res) => {
    const reqData = req.body;
    reqData.GDS_IMG = `${req.files[0].filename}`;    
    const query = MybatisMapper.getStatement('goodsMapper', 'insertGoods', reqData, format);
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

router.post('/getGoodsListCount', async(req,res) => {
    let reqData;
    if (req.body != null) {
        reqData = req.body;
    }
    console.log('reqData : ', reqData);    

    const query = MybatisMapper.getStatement('goodsMapper', 'getGoodsListCount', reqData, format);
    connection.query(query, (error, results2, fields) => {
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

router.post('/getGoodsList', async (req,res) => {
    let reqData;
    if(req.body != null){
        reqData = req.body;
    }
    console.log('reqData : ',reqData);    

    const query2 = MybatisMapper.getStatement('goodsMapper', 'getGoodsList', reqData, format);
    connection.query(query2, (error, results, fields) => {
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

const getGoodsListCount = async(reqData) => {
    
    const query = MybatisMapper.getStatement('goodsMapper', 'getGoodsListCount', reqData, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return 500;
        }
        console.log('count는 : ', results[0].COUNT);
        return results[0].COUNT;
    });
}

router.post('/updateGoods', upload.any(), async (req,res) => {
    const reqData = req.body;
    console.log(reqData);
    if(req.files.length > 0){
        reqData.GDS_IMG = `${req.files[0].filename}`;    
    }
    reqData.GDS_IMG = '';     
    const query = MybatisMapper.getStatement('goodsMapper', 'updateGoods', reqData, format);
    connection.query(query, (error, results, fields) => {
        if(error){
            console.log(error);
            return res.status(500);
        }
        console.log(results);
        return res.status(200).send({
            results
        });
        
    });
});

router.post('/getCategoryList', async (req, res) => {
    const query = MybatisMapper.getStatement('goodsMapper', 'getCategoryList', null, format);
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
})

router.post('/deleteGoods', async (req, res) => {
    const query = MybatisMapper.getStatement('goodsMapper', 'deleteGoods', req.body, format);
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

router.get('/getGoodsOne/:gds_num', (req,res) => {
    let reqData;
    console.log(req.params);
    
    if (req.params.gds_num != null) {
        reqData = req.params;
    } else {
        reqData = req.params.gds_num = null;
    }
    console.log('reqData : ', reqData);

    const query = MybatisMapper.getStatement('goodsMapper', 'getGoodsOne', reqData, format);
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

router.post('/upload', upload.any(), async(req, res) => {
    console.log(req.body);
});


export default router;