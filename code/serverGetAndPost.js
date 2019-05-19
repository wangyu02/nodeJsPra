const http = require('http');
const  urlLib = require('url');
const fs = require('fs');

http.createServer(function(request, response) {
    //实现Get请求
    if(request.url.indexOf('/favicon.ico') == -1) {
        var url = request.url;
        var Object = urlLib.parse(String(url));
        var urlName = Object.pathname;
        var GET = Object.query;
    } else {
        var url = http.url;
        console.log(url);
    }
    

    //实现post请求
    var str = '';
    request.on('data', function(data) {
        str += data;
    });
    request.on('end', function() {
        console.log(str);
    });

    //解决乱码问题
    switch (request.method) {
        case 'GET' : 
            response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
            response.write('成功');
            response.end();
            break;
        case 'POST' :
            var responseInfo = {};
            responseInfo['code'] = 200;
            responseInfo['success'] = true;
            responseInfo['message'] = '成功';
            response.write(JSON.stringify(responseInfo));
            response.end();
            break;
    }

    //实现文件系统
    fs.readFile('./www/aaa.txt', function(err, data) {
        if(err) {
            reponse.write('404');
        } else {
            reponse.write(data);
        }
        response.end();
    })
}).listen(8080);