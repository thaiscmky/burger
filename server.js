global.__basedir = __dirname;
const express = require('express');
const app = express();
const path = require('path');
const bodyParser=require("body-parser");
const handlbar =require("express-handlebars");
/*const routes = require(path.join(__basedir, "/controllers/burgers_controller"));*/


app.use(express.static(path.join(__dirname,'./public')));

const PORT = process.env.PORT || 3000;

//bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//handelbars
app.engine("handlebars", handlbar({
    defaultLayout:"main",
    layoutsDir: path.join(__basedir, './app/views/layouts'),
    partialsDir: path.join(__basedir, './app/views/partials')
}));
app.set("view engine","handlebars");

//routes
let routes = require(__basedir + "/app/routes");
app.use(routes);

//start server
app.listen(PORT,function(){
    console.log("server start " + PORT);
    console.log(path.join(__basedir, './app/views'));
});

