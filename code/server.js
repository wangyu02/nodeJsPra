//引用一个已经有的模块
const http = require('http');
const fs = require('fs');

//实现es6的相关语法
//每当有用户请求我的时候，就会回调这个函数，执行函数内部的内容
var server = http.createServer(function(request, response) {
    var fileName = "./www" + request.url;
    //if判断去除了favicon的影响
    if (fileName != "./www/favicon.ico") {
    //从url对应的数据
    //回调函数中的内容，是在触发相应的操作之后，才会执行的。
    fs.readFile(fileName, function(err, data) {
        if(err) {
            console.log('读取文件出现错误' + err);
        } else {
            //无需对data进行二进制文件的处理
            response.write(data);
        }
        //write必须在end之后，才能解决问题
        response.end();
    })
    //先执行下面的程序，在执行的上面的回调函数
    console.log('正常执行下面的程序');
    }
});

//服务器中存在一个监听的概念在其中，必须存在的
//端口：8888，其中存在端口转发的问题。
server.listen(8888);