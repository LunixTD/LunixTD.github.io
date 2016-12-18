$(function() {
    $.getJSON('/api/get_asks', function(res) {
        console.dir(res);
        var arr = [];
        var j = 1;
        arr = res.data;
        arr.forEach(function(item) {
            var date = new Date(item.id);
            var Y = date.getFullYear() + ' ';
            var M = (date.getMonth() + 1);
            M = M < 10 ? '0' + M + '-' : M + '-';
            var D = date.getDate();
            D = D < 10 ? '0' + D + ' ' : D + ' ';
            var h = date.getHours();
            h = h < 10 ? '0' + h + ':' : h + ':';
            var m = date.getMinutes();
            m = m < 10 ? '0' + m + ':' : m + ':';
            var s = date.getSeconds();
            s = s < 10 ? '0' + s : s;
            item.date = Y + M + D + h + m + s;
            var strHtml = '';
            var num = 0;
            if (item.answers) {
                num = item.answers.length;
            } else {
                num = 0;
            }
            var tplHtml = template('myFirstTpl', {
                title: (j++) + '. ' + item.content,
                date: item.date,
                id: item.id,
                num: num
            })
            $('.container').append(tplHtml);
        })
    })
})