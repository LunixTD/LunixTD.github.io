$(function() {
    // 提问点击事件
    $('#btnAsk').click(function() {
        //获取提问内容
        // console.log(55);
        var askContent = $('#txtAsk').val();
        if (askContent.trim() == '') {
            alert('提问内容不能为空');
            return false;
        }
        var loadingLayer;
        $.ajax({
            url: '/api/ask',
            data: { content: askContent },
            method: 'post',
            beforeSend: function() {
                console.log('问题正在提交');
                loadingLayer = layer.open({
                    type: 2,
                    shadeClose: false,
                    content: '问题正在提交'
                })
            },
            success: function(res) {
                console.log(res.data);
            },
            complete: function(result) { //完成后的回调
                console.dir(result);
                console.log('complete');
                layer.close(loadingLayer);
                layer.open({
                    content: '问题提交成功!~',
                    skin: 'msg',
                    time: 2
                });
                // layer.open({
                //     content: '问题提交成功',
                //     btn: '我知道了'
                // })
                setTimeout(function() {
                    window.location.href = '/问答主页.html';
                }, 1000)
            }
        })
    })

})