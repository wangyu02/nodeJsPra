const querystring = require('querystring');
const http = require('http');

http.createServer(function(request, response) {
    //此使代表没有找到/favicon.ico相关的内容
    if(request.url.indexOf('/favicon.ico') == -1) {
        var urlResult = request.url.split('?')[1];
        //使用url查询数据
        var json = querystring.parse(urlResult);
        console.log(json);
        //返回给前端的必须是一个string类型
        response.write(JSON.stringify(json));
        response.end();
    } else {
        var url = request.url;
        console.log('url:' + url);
    }
}).listen(8080);
