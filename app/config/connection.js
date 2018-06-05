const mysql = require("mysql2");
const path = require("path");
const dbconfig = require(path.join(__dirname,'/config.json')).dbconfig;
let rdbms = mysql.createConnection(
    process.env.JAWSDB_URL ? process.env.JAWSDB_URL : dbconfig
);
rdbms.info = dbconfig;

function connectDB(){

    return new Promise( (resolve, reject) => {
        rdbms.connect(function(err){
            if(err){
                if(err.code === 'ER_BAD_DB_ERROR'){
                    let extractedDbName = err.message.match(/'(.*?)'/)[1];
                    if (!process.env.JAWSDB_URL) delete dbconfig.database;
                    const newConnection = mysql.createConnection(process.env.JAWSDB_URL ? process.env.JAWSDB_URL : dbconfig);
                    newConnection.query('CREATE DATABASE ??', [extractedDbName], function (error, result, fields) {
                        if (error) throw error.message;
                        console.log('Database created');
                        console.log(result);
                        newConnection.end();
                        //connectDB(); <--this doesn't seem to be working...
                        rdbms = mysql.createConnection(
                            process.env.JAWSDB_URL ? process.env.JAWSDB_URL : rdbms.info
                        );
                        resolve(rdbms);
                    });
                }
                else
                    reject(err);
            }
            else {
                console.log(`Connected with threadID ${rdbms.threadId}`);
                resolve(rdbms);
            }
        });
    });
}

module.exports = connectDB();
