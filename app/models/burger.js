const path = require('path');
const Orm = require(path.join(__basedir, '/app/config/orm'));

const burger = new Orm('burger');
burger.updateById = function(id, devoured){
    console.log(id);
    devoured = Number(devoured);
    id = Number(id);
    if(isNaN(id))   return new Error('Burger ID must be an integer');
    if(id === null)
        return new Error('Burger id should not be empty');
    return this.upDateItem(id, devoured);
};
burger.addNew = function(item){
    if(typeof item !== 'object'
        || typeof item.label === 'undefined'
        || typeof item.value === 'undefined'
    )    return new Error('Burger item must be an object with properties label and value');
    if(item.value === null)
        return new Error('Burger item name should not be empty');
    return this.getItem(item)
        .then( found => {
            if(found.length)
                return new Error('Burger already exists');
            else
                return this.insertItem(item);
        })
        .catch( err => err);
};
burger.getList = function(){
    return this.selectAll().then(result => {
        return result.map(row => {
            return {id: row.id, name: row.burger_name, devoured: row.devoured};
        });
    });
};

module.exports = burger;