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
    res.sendFile(__dirname+"/templates/registration.html");
});
app.get("/log",function(req,res)
{
    res.sendFile(__dirname+"/templates/login.html");
});
app.post("/ch",function(req,res)
{
    let a=req.body.name;
    let b=req.body.email;
    let c=req.body.psw;
    con.connect(function(err)
    {
        if (err) throw err;
        console.log("connected!");
        var sql="INSERT INTO regis_tb (name, email, password) VALUES ('"+a+"', '"+b+"', '"+c+"')";
        con.query(sql,function (err, result)
        {
            if (err) throw err;
            console.log("data inserted");
        });
    });
    res.send("data inserted");
});
app.post("/log",function(req,res)
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

 var obj = {};
 app.get('/list',function(req,res){
     con.connect(function(err)
     {
     con.query('SELECT * FROM regis_tb', function(err,result){
         if(err){
             throw err;
         } else{
            // obj = {print: result};
             res.render('print2',{data:result});
         }
     });
 });
});

app.get("/edit",function(req,res)
{
            con.query("SELECT * FROM regis_tb WHERE id="+req.query["id"], function (err1, result) {
          if (err1) throw err1;
          else
          res.render('editd',{data:result});
        });
      });

      app.post("/upload",function(req,res){
        let n = req.body.m1;
        let em = req.body.m2;
        let pw = req.body.m3;
        let id = req.body.m0;
        
            var sql = "update regis_tb set Name='"+n+"',Email='"+em+"',Password='"+pw+"' where id="+id;
            con.query(sql,function(err,result){
                if(err) throw err;
                else
                {
                    var sql = "SELECT * FROM regis_tb";
                    con.query(sql,function(err,result){
                        if(err) throw err;
                        else
                        res.render('print2',{data:result});
                    });
                }
            });
    
        
      //  res.send("data is inserted");
    });


app.get("/del",function(req,res)
{

    var sql = "delete from regis_tb where id="+req.query["id"];
    con.query(sql,function(err,result){
        if(err) throw err;
        else
        var sql = "SELECT * FROM regis_tb";
        con.query(sql,function(err,result){
            if(err) throw err;
            else
            res.render('print2',{data:result});
        });
    });
}


)
 app.listen(3009,function(req,res){
     console.log("its running");
 });
