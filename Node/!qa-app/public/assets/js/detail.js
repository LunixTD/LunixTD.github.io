var params = window.location.search;
if (params.indexOf('?') < 0) {
    alert('请从正确的地址进行访问');
    setTimeout(function() {
        location.href = "/问答主页.html";
    }, 1000)
} else {
    var arrUrlParams = params.split('?')[1].split('&');
    var objUrlParams = {};
    arrUrlParams.forEach(function(item) {
        var eachParam = item.split('=');
        objUrlParams[eachParam[0]] = eachParam[1];
    })

    // ``是es6中的新语法，可实现字符串的替换
    // 需要替换的部分内容可写在${}内部
    $.getJSON(`/api/detail?aid=${objUrlParams.aid}`, function(res) {
        var html = template('tplDetail', res.data);
        $('.container').append($(html));
        console.log(res.data);
        if (!res.data.answers) {
            var empty = template('emptyMsg', {
                text: '该问题暂未有人回答'
            });
            $('.answer').append($(empty));
        }
    })

    function answerQuestion(aid) {
        // 判断输入框是否为空
        var txtContent = $('#txtAnswer').val().trim();
        if (txtContent == '') {
            alert('回答内容不能为空');
            return false;
        } else {
            $.ajax({
                url: '/api/do_answer',
                method: 'post',
                data: { aid: aid, content: txtContent },
                success: function(res) {
                    // 弹出提示框
                    layer.open({
                        content: '回答成功!~',
                        skin: 'msg',
                        time: 2
                    });
                    setTimeout(function() {
                        window.location.reload(); //重新加载页面
                    }, 2000)
                }
            })
        }
    }
}