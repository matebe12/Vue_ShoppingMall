import { Router } from 'express';
const router = Router();
import {getInfo} from '../mysql/mysql.js';

router.get('/test', (req, res) => {
    const data = getInfo();
    res.send(data);
});

export default router;