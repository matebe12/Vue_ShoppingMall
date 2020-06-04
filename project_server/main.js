import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';
//라우토
import vueRouter from './routers/index.js';
import vueApi from './api/test.js';

const app = express();
const port = 3000;
//express
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log request
app.use(cookieParser());
app.use(express.static('public'));
app.use(history());


app.use('/', vueRouter);
app.use('/api', vueApi);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})