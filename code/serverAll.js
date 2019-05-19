const http = require('http');
const urlLib = require('url');
const fs = require('fs');
const querystring = require('querystring');

//用来存储数据的json
var users = {};

var server = http.createServer(function(request, response) {
    var str = '';
    
    request.on('data', function(data) {
        str += data;
    });
    request.on('end', function() {
        //接收完成数据之后，对数据进行解析
        var obj = urlLib.parse(request.url, true);

        const url = obj.pathname;
        const GET = obj.query;
        //对post请求的数据，进行解析
        const post = querystring.parse(str);

        //此时遇到的问题：对文件和接口的区分
        if(url == '/user') {
            response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
            //对接口数据进行处理,将接收的数据，写到json串中
            switch(GET.act) {
                case 'reg' :
                    //1. 检查用户名是否已经存在
                    if(users[GET.user] != null) {
                        response.write('{"ok":false, "msg": "user已经存在"}');
                    } else {
                        //2. 插入users
                        users[GET.user] = GET.pass;
                        console.log(users);
                        response.write('{"ok": true, "msg" : "注册成功"}');
                    }
                    break;
                case 'login':
                    //1. 检查用户是否存在
                    console.log(GET);
                    console.log(GET.user, GET.pass);
                    if (users[GET.user] == null) {
                        response.write('{"ok" : false, "msg" : "此用户不存在"}');
                    } else if(users[GET.user] != GET.pass) {
                        console.log(users[GET.pass]);
                        console.log(GET.pass);
                        response.write('{"ok" : fasle, "msg": "用户密码输入错误"}');
                    } else {
                         //2. 检查用户名和密码
                        response.write('{"ok" : true, "msg" :"登陆成功"}');
                    }
                    break;
                default:
                    response.write('{"ok" : false,"msg":"未知的错误原因"}');
                    break;
            }
            response.end();
        } else {
            //对文件进行解析
            var file_name = './www' + url;
            fs.readFile(file_name, function(err, data) {
                if(err) {
                    response.write('404');
                } else {
                    response.write(data);
                }
                response.end();
            });
        }
    });
});

server.listen(8080);