global.__basedir = __dirname;
const path = require('path');
const bodyParser=require("body-parser");
const handlbar=require("express-handlebars");
const routes = require(path.join(__basedir, "/controllers/burgers_controller"));


app.use(express.static(path.join(__dirname,'./public')));

const PORT = process.env.PORT || 3000;
//bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//handelbars
app.engine("handlebars",handlbar({defaultLayout:"main"}));
app.set("view engine","handlebars");
//router
app.use('/',routes);

//start server
app.listen(PORT,function(){
    console.log("server start " + PORT)
})