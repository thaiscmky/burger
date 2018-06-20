const express = require('express');
const router = express.Router();
const request = require('request-promise');
const path = require('path');

const Orm = require(__basedir + '/app/config/orm');

router.get("/", function(req, res) {
    res.render('index');
});
module.exports = router;