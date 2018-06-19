const express = require('express');
const router = express.Router();
const request = require('request-promise');
const path = require('path');

const Orm = require(__basedir + '/app/config/orm');

router.get("/", function(req, res) {
    const query = new Orm('burger');
    let x = query.selectAll();
    x.then(y => console.log(y));
    res.json('hi');
});
module.exports = router;