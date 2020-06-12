import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
require('dotenv').config();

MybatisMapper.createMapper([`${MapperPath}/user/GoodsMapper.xml`]);


// router.get('/category', async (req,res) => {
//     const query = MybatisMapper.getStatement('goodsMapper', 'getCategory',null, format);
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             console.log(error);
//             return res.status(500);
//         }
//         console.log(results);
//         return res.status(200).send({
//             results
//         });
//     });
// });

router.get('/category/:reqData', async (req, res) => {
    console.log(req);
    
    const reqData = req.params;
    console.log(reqData);
    
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

router.post('/InsertGoods', async (req,res) => {
    const reqData = req.body;
    console.log(reqData);
    
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
})


export default router;