import { MybatisMapper, connection, MapperPath, format } from '../mysql/mysql.js';

async function Method(mapperId, sqlId, reqData){
    try {
        const query = MybatisMapper.getStatement(mapperId, sqlId, reqData, format);
        return new Promise((resolve) => {
            connection.query(query, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    console.log(query);
                    resolve(error);
                } else{
                    console.log(query);
                    resolve(results);
                }
               
            });
        });
    } catch (error) {
        return error;
    }
}

export {
    Method
}