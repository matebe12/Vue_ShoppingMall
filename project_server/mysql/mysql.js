import mysql from 'mysql';
import MybatisMapper from 'mybatis-mapper';
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database : 'shopping_mall',
    password : 'init1234'
});

const MapperPath = process.env.MYBATIS_PATH;

MybatisMapper.createMapper([`${MapperPath}testMapper.xml`]);

const param = {
    stringman : '사람살려'
};

const format = {
    language: 'sql',
    indent : ''
};

function getInfo(){
    const query = MybatisMapper.getStatement('testMapper', 'getInfo', null, format);

    connection.connect();
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        console.log(results);
        connection.end();
        return results;
    });
}

export {getInfo};
