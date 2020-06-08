import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
require('dotenv').config();

MybatisMapper.createMapper([`${MapperPath}/user/GoodsMapper.xml`]);


router.get('/category', (req,res) => {
    const reqData = req.body;
    const query = MybatisMapper.getStatement('goodsMapper', 'getCategory', reqData != null ? reqData:null, format);
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