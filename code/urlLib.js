const urlLib = require('url');
const http = require('http');

http.createServer(function(request, response) {
    console.log(request);
    //对url进行解析韩式
    var urlObject = urlLib.parse(request.url, true);
    var url = urlObject.pathname;
    var GET = urlObject.query;
    console.log(url, GET);

    response.write(JSON.stringify(urlObject));
    response.end();
}).listen(8080);