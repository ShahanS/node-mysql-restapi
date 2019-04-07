const mysql     =  require('promise-mysql');

const hostName = "us-cdbr-iron-east-03.cleardb.net";
const userName = "bdb8f970295290";
const password = "46984ba1";
const databaseName = "ad_e68d0735128e6ad";

const DB = {
    connect: () => {
        const pool = mysql.createPool({
            connectionLimit: 100,
            host: hostName,
            user: userName,
            password: password,
            database: databaseName,
            port:3306
        });

        pool.getConnection((error, connection) => {
            if (error) {
                console.log('Failed to connect DB:' + error);
            }
            if (connection) {
                connection.release();
            } 
            return;
        });
        return pool;
    },

    selectAll: async (connection, tableName) => {
        try {
            let results = await connection.query(`SELECT * FROM ${ tableName }`);
            return results;
        } catch (error) {
        }
    },

    selectOne: async (connection, tableName, neededColumnName, searchColumnName, searchColumnValue) => {
        try {
            let queryStatement = `SELECT ${ neededColumnName } ` +  
                                 `FROM ${ tableName } ` + 
                                 `WHERE ${ searchColumnName } IN (${ searchColumnValue })`;
            let results = await connection.query(queryStatement);
            return results;
        } catch (error) {
        }
    },

    insert: async (connection, tableName, payload) => {
        try {
            await connection.query(`INSERT INTO ${ tableName } SET ?`, payload);
            return false;
        } catch (error) {
            return true;
        }
    },

    insertIgnore: async (connection, tableName, payload) => {
        try {
            let queryStatement = `INSERT IGNORE INTO ${ tableName } VALUES ${ payload }`;
            await connection.query(queryStatement);
            return false;
        } catch (error) {
            return true;
        }
    },

    update: async (connection, tableName, columnOne, valueOne, updateColumnName, updateColumnValue) => {
        try {
            let queryStatement = `UPDATE ${ tableName } 
                                  SET ${ columnOne } = '${ valueOne }'
                                  WHERE ${ updateColumnName } = '${ updateColumnValue }'`;

            let results = await connection.query(queryStatement);
        } catch (error) {
            return error;
        }
    },

    nativeQuery: async(connection, queryStatement) => {
        try {
            let results = await connection.query(queryStatement);
            return results;
        } catch (error) {
            return error;
        }
    }
};

module.exports = { DB };
