var express = require('express');
var app = express();

var allowCrossDomain = function(req, res, next) {//设置response头部的中间件
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);
app.get("/computeLog",function (request,response) {
    var msg = {
        data: '解析数据文件，解析参数设置，计算局部模型系数......'
    }
    response.send(msg);
})

app.listen('3000',function () {
    console.log('>listening on 3000')
});

