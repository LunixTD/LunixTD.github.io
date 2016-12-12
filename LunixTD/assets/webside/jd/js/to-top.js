//            头部背景渐变以及to-top显示

$('#to-top').find('a').on('click', function() {
    $(window).scrollTop(0);
});

function headColor() {
    var header = $('#top');
    var topH = $(window).scrollTop();
    var bannerH = 500 || $('.banner1').height() * 2;
    var op_num = 0.9 / bannerH * topH;
    if (topH == 0) {
        header.css('background', 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))');
    }
    if (topH > 0 && topH <= bannerH) {
        header.css('background', '');
        header.css('background-color', 'rgba(255,40,60,' + op_num + ')');
    }
    if (topH > bannerH) {
        $('#to-top').css('display', 'inline-block');
        header.css('background-color', 'rgba(255,40,60,0.9)');
    } else {
        $('#to-top').css('display', 'none');
    }
}
headColor();
$(window).scroll(function() {
    headColor();
});
