const ex=require("express");
const app= ex();
const path=require("path");
const bp=require("body-parser");
var mysql = require("mysql");
app.set('views','statics');
app.set('view engine','ejs');
app.use(bp.urlencoded({extended:true}));
var con =mysql.createConnection({
host: "localhost",
user:"root",
password:"",
database:"foodie"
});
app.use(ex.static(__dirname+"/statics"));
app.get("/",function(req,res){
res.sendFile(path.join(__dirname,"templates","index.html"));
});
app.get("/sg",function(req,res){
res.sendFile(path.join(__dirname,"statics","sign.html"))
})
app.get("/lg",function(req,res){
res.sendFile(path.join(__dirname,"statics","login.html"))
})
app.get("/add",function(req,res){
res.sendFile(path.join(__dirname,"statics","add.html"))
})
app.post("/ch",function(req,res){
let j=req.body.us
let a=req.body.em;
let p=req.body.psw;
con.connect(function(err){
if(err) throw err;
console.log("connected");
var sql ="INSERT INTO users (username,email,password) VALUES ('"+j+"','"+a+"','"+p+"')";
con.query(sql, function (err,result){
if(err) throw err;
console.log("data inserted");
});
});
res.send("data inserted");
});
app.post("/cc",function(req,res){
let aa=req.body.us;
let pp=req.body.psw;
let qq=req.body.ac;
con.connect(function(err){
if(err) throw err;
console.log("connected");
var sql ="select* from users where username='"+aa+"' and password='"+pp+"'";
console.log(sql);
con.query(sql, function (err,result){
if(err) throw err;
else
res.render('admin',{name:aa,title:"pp"})
});
});
});
var obj = {};
app.get('/list', function(req, res){
con.query('SELECT * FROM menu', function(err, result) {
if(err){
throw err;
} else {
obj = {print: result};
res.render('menu1', obj);
}
});
});
app.get("/edit",function(req,res)
{
con.query("SELECT * FROM menu WHERE id="+req.query["id"], function (err1, result) {
if (err1) throw err1;
else
res.render('editd',{data:result});
});
});
app.post("/upload",function(req,res){
let nm = req.body.t1;
let ct = req.body.t2;
let ph = req.body.t3;
let pf = req.body.t4;
let id = req.body.t0;
var sql = "update menu set name='"+nm+"',category='"+ct+"',priceh='"+ph+"',pricef='"+pf+"' where id="+id;
con.query(sql,function(err,result){
if(err) throw err;
else
{
var sql = "SELECT * FROM menu";
con.query(sql,function(err,result){
if(err) throw err;
else
res.render('menu1',{data:result});
});
}
});
// res.send("data is inserted");
});
app.get("/del",function(req,res)
{
var sql = "delete from menu where id="+req.query["id"];
con.query(sql,function(err,result){
if(err) throw err;
else
var sql = "SELECT * FROM menu";
con.query(sql,function(err,result){
if(err) throw err;
else
res.render('menu1',{data:result});
});
});
} );
app.post("/update",function(req,res){
let nmm = req.body.t1;
let ctt = req.body.t2;
let phh = req.body.t3;
let pff = req.body.t4;
var sql = "INSERT INTO menu (name,category,priceh,pricef) VALUES ('"+nmm+"','"+ctt+"','"+phh+"','"+pff+"')";
con.query(sql,function(err,result){
if(err) throw err;
else
{
var sql = "SELECT * FROM menu";
con.query(sql,function(err,result){
if(err) throw err;
else
res.render('menu1',{data:result});
});
}
});
});
var obj = {};
app.get('/users', function(req, res){
con.query('SELECT * FROM users', function(err, result) {
if(err){
throw err;
} else {
obj = {print: result};
res.render('user', obj);
}
});
});
app.get("/editt",function(req,res)
{
con.query("SELECT * FROM users WHERE id="+req.query["id"], function (err1, result) {
if (err1) throw err1;
else
res.render('editdu',{data:result});
});
});
app.post("/uploadd",function(req,res){
let um = req.body.t1;
let emm = req.body.t2;
let psww = req.body.t3;
let rl = req.body.t4;
let id = req.body.t0;
var sql = "update users set username='"+um+"',email='"+emm+"',password='"+psww+"',role='"+rl+"' where id="+id;
con.query(sql,function(err,result){
if(err) throw err;
else
{
var sql = "SELECT * FROM users";
con.query(sql,function(err,result){
if(err) throw err;
else
res.render('user',{data:result});
});
}
});
// res.send("data is inserted");
});
app.get("/dell",function(req,res)
{
var sql = "delete from users where id="+req.query["id"];
con.query(sql,function(err,result){
if(err) throw err;
else
var sql = "SELECT * FROM users";
con.query(sql,function(err,result){
if(err) throw err;
else
res.render('user',{data:result});
});
});
});
app.listen(3000);