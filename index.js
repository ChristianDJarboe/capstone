const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { logger, authenticate } = require('./middleware')
const authRouter = require("./routers/auth")
const apiRouter = require("./routers/api")


const PORT = process.env.PORT || 8080;

console.log('server started on port:',PORT);

app.use(bodyParser.json());
app.use(logger);
// app.use(function(req, res, next) {
//     res.setHeader("Content-Type", "application/json");
//     next();
// });
app.use(bodyParser.urlencoded({extended: false}));

app.use("/auth",authRouter);
app.use("/api", apiRouter);

app.get("/dashboard",authenticate,(req,res)=>{
    app.use(express.static(__dirname+"/views/dashboard/build/static"));            //required for css and js
    app.use(express.static('./views/dashboard/build', express.static('static')));  //required for images and fonts
    res.sendFile(__dirname + "/views/dashboard/build/index.html");   
})

app.get("/",(req,res)=>{
    app.use(express.static(__dirname+"/views/landing/build/static"));            //required for css and js
    app.use(express.static('./views/landing/build', express.static('static')));  //required for images and fonts
    res.sendFile(__dirname + "/views/landing/build/index.html");   
})

app.listen(PORT);