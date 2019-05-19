const http = require("http");

http.createServer(function(request, response) {
    //该种方法实现的是对象
    var GET = {};
    if (request.url.indexOf('/favicon.ico') !=  -1) {
        //通过request获取前端数据
        var httpUrls = request.url.split('?');
        for (var i = 0; i < httpUrls.length; i++) {
            if(httpUrls[i].includes('&')) {
                var result = httpUrls[1].split('&');
                for (var j = 0; j < result.length; j++) {
                    var array3 = result[j].split('=');
                    //JSON串的实现方法
                    GET[array3[0]] = array3[1];
                }
            } else {
                console.log(httpUrls[0]);
            }
        }
        console.log(request.url, GET);
        response.write('12344');
        response.end();
    }
}).listen(8080);