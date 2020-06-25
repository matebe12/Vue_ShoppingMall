import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
require('dotenv').config();

MybatisMapper.createMapper([`${MapperPath}/cart/CartMapper.xml`]);
router.post('/addGoodsCart', async (req, res) => {
    const reqData = req.body;
    const query = MybatisMapper.getStatement('cartMapper', 'addGoodsCart', reqData, format);
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

router.get('/getCartList/:user_id', async (req, res) => {
    let reqData;
    if (req.params.user_id != null) {
        reqData = req.params;
    } else {
        reqData = req.params.user_id = null;
    }
    console.log('reqData : ', reqData);

    const query = MybatisMapper.getStatement('cartMapper', 'getCartList', reqData, format);
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

router.post('/deleteCart', async (req, res) => {
    const reqData = req.body;
    if(req.body == null || req.body.USER_ID == '' || req.body.CART_NUM == ''){
        return res.status(400).send({
            msg : 'Bad Request Data'
        });
    }
    const query = MybatisMapper.getStatement('cartMapper', 'deleteCart', reqData, format);
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

// function updateGoodsStock(reqData){
//     const query = MybatisMapper.getStatement('cartMapper', 'updateGoodsStock', reqData, format);
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
// }

export default router;