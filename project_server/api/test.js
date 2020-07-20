import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../mysql/mysql.js';

MybatisMapper.createMapper([`${MapperPath}/user/UserMapper.xml`]);


router.post('/', (req, res) => {
    const baseurl = 'http://localhost:3000/다운로드.jpg';
    console.log(baseurl);
    res.send(baseurl);
});

export default router;