/***
 * For some reason, install file still needs to be run twice in order to create the DB AND install sample data
 */
const path = require('path');
const connection = require(path.join(__dirname,'../','/config/connection'));
const fs = require('fs');
const csvparse = require("csv-parse");

function installSchema(sql){
    return connection.then(conn => {
        console.log('Installing schema');
        conn.query(sql, function (err, result, fields){
            if(err){
                throw err;
            }
            console.log('Table created');
            console.log(result);
        });
    }).then( function(){
        readFile(path.join(__dirname,'/db/seeds.csv'), 'seed');
    }).then( function() {
        process.exit(0);
    }).catch(err => err.message);
}
function installSampleData(csv, table){

    return connection.then(conn => {
        console.log('Installing sample data');
        csvparse(csv, { columns: true, delimiter: ',' }, function(err, data) {
            if (err)
                throw err;
            data.forEach(function(rowObj){
                let fields = Object.keys(rowObj);
                let values = Object.values(rowObj).map(function(value){ return Number(value) ? value : `"${value}"`; });
                let sql = `INSERT INTO ${conn.info.database}.${table}(${fields.join(', ')}) VALUES(${values.join(',')});`;
                conn.query(sql, function (error) {
                    if (error) throw error;
                });
            });
        }).on('finish', function(){
            console.log(`Sample data install complete.`);
        });
    });
}

function readFile(filepath, type){
    if(type === 'schema'){
        const sql = fs.readFileSync(filepath, 'utf-8');
        installSchema(sql);
    }
    if(type === 'seed'){
        const seed = fs.readFileSync(filepath, 'utf-8');
        installSampleData(seed, 'burgers');
    }
}

readFile(path.join(__dirname,'/db/schema.sql'), 'schema');

