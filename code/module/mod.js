//想要对外输出东西，必须加到exports上
exports.a = 12;

    var a = 12;
    var b = 5;
    var c = 13;

    console.log(module.exports == exports);
    module.exports = {a:12, b:8, c:9};