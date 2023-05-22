const express = require("express");
const session = require('express-session');
var mysql = require("mysql");
var Promise = require("promise");

task_num = 0;

// setup the app object
const app = express();
const PORT = 8061

app.engine('pug', require('pug').__express)
app.set("views", "templates");
app.set("view engine", "pug");

app.use(express.urlencoded({extended:true}));
app.use(session({secret:"lol"}))
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})
app.use(express.static(__dirname));
app.use(express.json());

// set up a connection pool
var con = mysql.createPool({
    connectionLimit: 5,
    host: "cse-mysql-classes-01.cse.umn.edu",
    user: "C4131F22U29",
    database: "C4131F22U29",
    password: "891",
  });

// routes
app.get("/", function(req, res) {
    res.redirect("/todo.html")
});

app.get("/todo.html", (req, res)=>{
    if (task_num == 0){
        let sql = "select task_number from tasks order by task_number desc limit 1;"
        con.query(sql, (err, rows)=>{
            if(err){
                console.log(err)
                task_num = 1
            }
            else if (rows.length == 0){
                task_num = 1
            }
            else{
                task_num = rows[0].task_number+1
            }
        })
    }
    let sql = "select * from tasks;"
    if(req.query.filtering != undefined && req.query.filtering != "all"){
        sql = "select * from tasks where progress = " + `'${req.query.filtering}'` + ";"
    }
    return new Promise((resolve, reject)=>{
        con.query(sql, (err, rows)=>{
            if(err){
                console.log(err)
                reject(err);
                res.render("todo.pug", {data: []})
            }
            else{
                res.render("todo.pug", {data: rows})
            }
        })
    })
});


// helper function for adding new entries to the db
function addTasks(req, res) {
    return new Promise((resolve, reject) => {
        const sql = "insert into tasks (task_number, task, progress) values (" + task_num + ", '', 'not done')";
        con.query(sql, (err, rows)=>{
            if (err){
                console.log(err)
                reject(err);
                res.json({task_num: task_num, res: -1})
            }
            else{
                task_num++
                res.json({task_num: task_num, res: 0})
            }
        })
    })
}

function updateTasks(req, res) {
    return new Promise((resolve, reject)=>{
        const sql = "update tasks set " + req.body.name + " = '" + req.body.value + "' where task_number = " + req.body.task_num + ";"
        con.query(sql, (err, rows)=>{
            if(err){
                console.log(err)
                reject(err);
            }
            else{
                res.json({task_num: req.body.task_num, res: 0})
            }
        })
    })
}

function deleteTasks(req, res, task_number) {
    return new Promise((resolve, reject)=>{
        console.log(task_number)
        if (task_number){
            const sql = "delete from tasks where task_number = " + task_number
            con.query(sql, (err, rows)=>{
            if(err){
                console.log(err)
                reject(err);
                res.json({"task_num": task_number, "res": -1})
            }
            else{
                res.json({task_num: task_number, res: 0})
            }
        })
        }
    })
}

app.post("/api/add", async function(req, res){
    await addTasks(req, res)
});

app.post("/api/delete", async function(req, res){
    await deleteTasks(req, res, req.body.task_num)
});

app.post("/api/update", async function(req, res){
    await updateTasks(req, res)
});

// Start the web server
app.listen(PORT, function() {
   console.log(`Listening on http://localhost:${PORT}`);
});
