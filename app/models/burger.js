const path = require('path');
const Orm = require(path.join(__basedir, '/app/config/orm'));

const burger = new Orm('burger');
burger.updateById = function(id, item, devoured){
    devoured = Number(devoured);
    item.value = escape(item.value.trim());
    id = Number(id);
    if(isNaN(id))   return new Error('Burger ID must be an integer');
    if(typeof item !== 'object'
        || typeof item.label === 'undefined'
        || typeof item.value === 'undefined'
    )    return new Error('Burger item must be an object with properties label and value');
    if(item.value === null)
        return new Error('Burger item name should not be empty');
    return this.upDateItem(id, item, devoured);
};
burger.addNew = function(item){
    if(typeof item !== 'object'
        || typeof item.label === 'undefined'
        || typeof item.value === 'undefined'
    )    return new Error('Burger item must be an object with properties label and value');
    if(item.value === null)
        return new Error('Burger item name should not be empty');
    return this.insertItem(item);
};
burger.getList = function(){
    return this.selectAll().then(result => {
        return result.map(row => {
            return {id: row.id, name: row.burger_name, devoured: row.devoured};
        });
    });
};

module.exports = burger;