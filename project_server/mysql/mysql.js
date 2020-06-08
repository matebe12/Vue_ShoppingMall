import mysql from 'mysql';
import MybatisMapper from 'mybatis-mapper';
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shopping_mall',
    password: '156756',
});

const MapperPath = process.env.MYBATIS_PATH;

MybatisMapper.createMapper([`${MapperPath}testMapper.xml`]);


const format = {
    language: 'sql',
    indent : ''
};
connection.connect();
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

export { getInfo, connection, MybatisMapper, format, MapperPath };
