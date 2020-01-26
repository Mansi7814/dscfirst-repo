const ex = require("express");
const app = ex();
app.set('views','./view');
app.set('view engine','ejs');
const bp = require("body-parser");
var mysql = require('mysql');
app.use(bp.urlencoded({extended:true}));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "express_db_con"

});
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/templates/login.html");
});
app.post("/hc",function(req,res)
{
    let a=req.body.u1;
    let b=req.body.u2;
    con.connect(function(err)
    {
        if (err) throw err;
        console.log("connected!");
        
        var sql="select* from regis_tb where email='"+a+"' and password='"+b+"'";
        con.query(sql,function (err, result)
        {
            if (err) throw err;
            else
            res.render('welcome_page', { title: 'Hey', name: 'Hello there!' });
        });
    });
   
});
app.listen(3010,function(req,res)
{
    console.log("its running");
});