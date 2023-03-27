// const express = require("http")
// express.createServer((req, res) =>{
//     res.statusCode = 200;
//      res.setHeader('Content-Type', 'text/plain;charset=utf-8');
//     if(req.method === 'GET') {
//         // toGet(req, res);
//         console.log(res);
//         res.
//         res.end("1")
//     }else if(req.method === 'POST') {
//         // toPost(req, res);
//     }
// }).listen(80, ()=>{
//     console.log("running");
// })

const express = require("express")
const cookieParser = require("cookie-parser")
let app = express()
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("hello")
})

app.get("/setcookie", (req, res) =>{
    res.cookie("username", "12333")
    res.send("successfully")
})
app.get("/getcookie", (req, res) =>{
  console.log(req.cookies);
  res.send(req.cookies)
})
app.listen(80, (err)=> {
    if(err) throw err
    console.log("running");
})

