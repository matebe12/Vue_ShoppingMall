import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format, getInfo } from '../mysql/mysql.js';
import {mailOptions, transpoter} from '../config/email.js';
MybatisMapper.createMapper([`${MapperPath}/user/UserMapper.xml`]);


router.post('/', (req, res) => {
    const baseurl = 'http://localhost:3000/다운로드.jpg';
    console.log(baseurl);
    res.send(baseurl);
});

router.post('/data', async(req, res) => {
    try {
        let result = await getData();
        console.log(`${result}`);
        res.status(200).send(result)
    } catch (error) {
        res.send(error);
    }
    
});

router.post('/email', async (req, res) => {
    mailOptions.to = 'matebe12@gmail.com';
    transpoter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        else {
            console.log('Email sent: ' + info.response)
        }
    });

});

async function getData() {
    try {
        const query = MybatisMapper.getStatement('testMapper', 'getInfo', null, format);
        return new Promise((resolve) => {
            connection.query(query, (error, results, fields) => {
            if (error) {
                console.log(error);
                resolve(error);
            }else
            resolve(results);
        });
    });
    } catch (error) {
        return error;
    }
    
}

export default router;