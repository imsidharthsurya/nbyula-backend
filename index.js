import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser"
import cors from "cors";

const app=express();

app.use(cors())
app.use(express.json())
// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nbyula',
    password:"Sidharth@123"
  });
  
app.post("/applicantSignup",(req,res)=>{
  console.log(req.body);
  const {email,password}=req.body;
  connection.query(
    'insert into applicants(email,password) value(?,?)',[email,password],
    function (err, results, fields) {
      res.status(201).send("applicants signup success");
    }
  );
})

app.post("/terraformersSignup",(req,res)=>{
  console.log(req.body);
  const {email,password}=req.body;
  connection.query(
    'insert into terraformers(email,password) value(?,?)',[email,password],
    function (err, results, fields) {
      res.status(201).send("terraformers signup success");
    }
  );
})
 
app.post("/jobpost",(req,res)=>{
    console.log(req.body);
    const {email,title,desc,phoneNumber,deadline,location}=req.body;
    
    connection.query(
      'insert into job(title,description,phonenumber,location,deadline,email,teraid) value(?,?,?,?,?,?,?)',[title,desc,phoneNumber,location,deadline,email,1],
      function (err, results, fields) {
        console.log("result is: ",results)
        res.status(201).send("Job posted Successfully");
      }
    );

})

app.get("/alljobs",(req,res)=>{
  connection.query(
    'select * from job',
    function (err, results, fields) {
      res.json(results);
    }
  );
})
app.get("/",(req,res)=>{
    res.send("My home page");
})

// app.get("/data",(req,res)=>{
//      // A simple SELECT query
//   connection.query(
//     'SELECT * FROM test where age<>?',[20],
//     function (err, results, fields) {
//       res.send(results)
//     }
//   );
// })

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
})