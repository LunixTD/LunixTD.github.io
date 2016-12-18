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
        $.ajax({
            url: '/api/ask',
            data: { content: askContent },
            method: 'post',
            success: function(res) {
                console.log(res.data);
            }
        })
    })

})