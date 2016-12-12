//        验证码生成
var code = '';
function createCode(){
    code = '';
    var length = 4;
    var selectorCode = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
    for(var i = 0;i<length;i++){
        var randNum = Math.floor(Math.random()*32);
        code += selectorCode[randNum];
    }
    $('.content .input a.code').text(code);
}
createCode();
$('.content .input a.code').on('click',function(){createCode();})