const fs = require('fs');

//readFile(文件名， 回调函数);
fs.readFile('aaa.txt', function(err, data) {
    console.log(err);
    if(err) {
        console.log('没有找到文件');
    } else {
        console.log(data.toString());
    }
}) ;
// fs.writeFile();
fs.writeFile('bbb.txt', 'aaaaaaa', function(err){
    console.log(err);
})