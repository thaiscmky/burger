const mysql = require("mysql2");
const path = require("path");
let dbconfig = {};
if(process.env.JAWSDB_URL)
    dbconfig =  process.env.JAWSDB_URL;
else dbconfig = require(path.join(__dirname,'/config.json')).dbconfig;

let rdbms = mysql.createConnection(dbconfig);
rdbms.info = process.env.JAWSDB_URL ? false : dbconfig;

function connectDB(){

    return new Promise( (resolve, reject) => {
        rdbms.connect(function(err){
            if(err){
                if(err.code === 'ER_BAD_DB_ERROR'){
                    let extractedDbName = process.env.JAWSDB_URL ? err.message.match(/'(.*?)'/)[1];
                    if (!process.env.JAWSDB_URL) delete dbconfig.database;
                        resolve(extractedDbName);
                }
                else
                    reject(err);
            }
            else {
                console.log(`Connected with threadID ${rdbms.threadId}`);
                resolve(rdbms);
            }
        });
    }).then(function(database){
        if(typeof database === 'string' && !process.env.JAWSDB_URL){
            const newConnection = mysql.createConnection(process.env.JAWSDB_URL ? process.env.JAWSDB_URL : dbconfig);
            newConnection.query('CREATE DATABASE ??', [database], function (error, result, fields) {
                if (error) throw error.message;
                console.log('Database created');
                console.log(result);
                connectDB();
                newConnection.end();
                rdbms = mysql.createConnection(
                    process.env.JAWSDB_URL ? process.env.JAWSDB_URL : rdbms.info
                );

            });
        } else {
            return database;
        }
    }).catch(error => error);
}

module.exports = connectDB();
