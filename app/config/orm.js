const path = require('path');
let connection = require(path.join(__dirname,'../','/config/connection'));
connection.then(conn => {
    connection = conn;
});

function Orm(model){
    this.table = model+'s';
}
Orm.prototype.constructor = Orm;
Orm.prototype.selectAll = function() {
    const sql = 'SELECT * FROM ??';
    return this.ormPromise(sql, [this.table]);
};
Orm.prototype.insertItem = function(name) {
    const sql = 'INSERT INTO ?? (??) VALUES (?)';
    const values = [this.table, name.label, name.value];
    return this.ormPromise(sql, values);
};
Orm.prototype.getItem = function(name) {
    const sql = 'SELECT * FROM ?? WHERE ?? = ?';
    const values = [this.table, name.label, name.value];
    return this.ormPromise(sql, values);
};
Orm.prototype.upDateItem = function(id, boolean) {
    const sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    const values = [this.table, 'devoured', boolean, 'id', id ];
    return this.ormPromise(sql, values);
};
Orm.prototype.ormPromise = function(sql, values){
    return new Promise((resolve, reject) => {
        connection.query(sql, values, function(err, result, fields) {
            if(err) reject(err);
            resolve(result);
        });
    });
};
module.exports = Orm;