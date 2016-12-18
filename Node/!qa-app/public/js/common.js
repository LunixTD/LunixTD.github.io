// 通过此方法为jquery的ajax请求做全局设置
// 通过ajaxSetup做的全局配置，在实际请求方法中会被覆盖
var _globalAjaxLoadingLayer;
$.ajaxSetup({
    beforeSend: function() { //设置请求开始后的动作
        console.log('请求已经发起');
        //loading带文字
        _globalAjaxLoadingLayer = layer.open({
            type: 2,
            shadeClose: false,
            content: '加载中'
        });
    },
    complete: function(result) { //完成后的回调
        console.dir(result);
        console.log('complete');
        layer.close(_globalAjaxLoadingLayer);
    },
    error: function(err) {
        console.log(err);
    }
})