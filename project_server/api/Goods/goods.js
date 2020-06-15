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

router.get('/getGoodsList', async (req,res) => {
    const query = MybatisMapper.getStatement('goodsMapper', 'getGoodsList', null, format);
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

router.post('/updateGoods', async (req,res) => {
    const query = MybatisMapper.getStatement('goodsMapper', 'updateGoods', req.body, format);
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

router.post('/upload', upload.any(), async(req, res) => {
    console.log(req.body);
});


export default router;