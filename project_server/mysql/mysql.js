import mysql from 'mysql2';
import MybatisMapper from 'mybatis-mapper';
require('dotenv').config();
import path from 'path';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shopping_mall',
    password: '156756',
});

const MapperPath = process.env.MYBATIS_PATH;

MybatisMapper.createMapper([path.join(__dirname, '../mappers/testMapper.xml')]);


const format = {
    language: 'sql',
    indent : ''
};
connection.connect((err) => {
    if(err)
        console.log(err);
    
});

export { connection, MybatisMapper, format, MapperPath };
