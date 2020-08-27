import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';
//라우토
import vueRouter from './routers/index.js';
import userApi from './api/user/user_sign.js';
import goodsApi from './api/Goods/goods.js';
import replyApi from './api/Reply/reply.js';
import cartApi from './api/Cart/cart.js';
import requestIp from 'request-ip';
const ipfilter = require('express-ipfilter').IpFilter;
let ips = ['::ffff:51.159.56.131','::ffff:124.93.26.5', '::ffff:195.54.160.21', '::ffff:195.54.160.21'];

require('dotenv').config();
const app = express();
const port = 3000;
//express
app.use(ipfilter(ips));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log request
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static("C:\\upload"));
app.use(history({
    index: '/'
}));
process.env.NODE_ENV = 'dev';
console.log(process.env.NODE_ENV);


app.use('/', vueRouter);
app.use('/api/user', userApi);
app.use('/api/goods', goodsApi);
app.use('/api/reply', replyApi);
app.use('/api/cart', cartApi);

app.use(requestIp.mw());
app.use((req,res) => {
    const ip = req.clientIp;
    console.log(`${ip}가 사이트에 접속하였습니다.${new Date()}`);
    res.end(ip);
})
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})