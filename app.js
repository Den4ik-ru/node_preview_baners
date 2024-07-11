const path = require('path');
const express = require('express');
const app = express();
const multer  = require("multer");
app.use(multer({dest:"uploads"}).single("filedata"));
const router = require('./routes/router_site');
app.use('/', router);
const cookieParser = require('cookie-parser')
app.use(cookieParser('secret key'));

app.set("twig options", {
    allowAsync: true, 
    strict_variables: false
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    next("   ");
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    })     
})

app.listen(3000, function () {  
    console.log('Сервер запущен!');
})