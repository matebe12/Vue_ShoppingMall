import { Router } from 'express';
const router = Router();
import {getInfo} from '../mysql/mysql.js';

router.post('/', (req, res) => {
    const baseurl = 'http://localhost:3000/다운로드.jpg';
    console.log(baseurl);
    res.send(baseurl);
});

export default router;