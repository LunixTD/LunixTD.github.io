$(function() {

    $('#content').css({
        'background-color': 'lightgrey',
        'font-size': '30px',
        'color': 'white',
        'width': '200px',
        'height': '130px'
    })
    $('#content').html('这是一段很长的文字，我也不知道有多长~');
    var loadingLayer;
    $('#btnGetData').bind('click', function() {
        // 服务器返回信息状态码
        // 200 成功; 404 找不到页面; 500+ 服务器内部错误
        $.ajax({
            url: '/aaa', //请求地址
            timeout: 5000, //超时时间
            method: 'get', //请求方法 
            data: '', //传递的数据
            dataType: 'json', //返回的数据类型
            success: function(res) { //成功回调
                console.log('success');
                console.dir(res);
            }
        })
    })
})