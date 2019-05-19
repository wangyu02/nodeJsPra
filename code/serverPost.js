const http = require('http');

http.createServer(function(request, response) {
    //用来存储接收数据的字符串
    var str = '';
    //计算次数的函数
    var i = 0;
    //接收post请求
    //当有数据到达之后，data会执行多次
    request.on('data', function(data) {
        str += data;
        console.log('第' + ++i +'获取到数据');
    });
    //end只会执行一次，就是在请求结束的时候
    request.on('end', function() {
        console.log(str);
    }); 
    //结束之后，对获取到的json串进行处理
    var result = {};
    result["code"] = 200;
    result["success"] = true;
    result["message"] = '成功';
    console.info(JSON.stringify(result));
    response.write(JSON.stringify(result));
    response.end(); 
}).listen(8080);