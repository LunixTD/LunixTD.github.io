// 分类背景图
$('.body-container .nav a').each(function(index, item) {
    $(this).css('background-image', 'url(img/box/navbox' + (index + 1) + '.jpg)');
})

// box模糊背景
$('.panel-line .inline-box .mask-bg').each(function(index, item) {
    $(this).css('background-image', 'url(img/box/panel_bg' + (index + 1) + '.jpg)');
})

// hover特效
$('.inline-box .face').on('mouseover', function() {
    $(this).siblings('.mask-bg').addClass('mask-in')
})
$('.inline-box .face').on('mouseout', function() {
    $(this).siblings('.mask-bg').removeClass('mask-in')
})

// banner部分 视差处理
$(document).on('scroll', function() {
    if ($(document).scrollTop() > 250) {
        $('.head-container header').addClass('un-top');
        $('.button .to-top').css('display', 'block');
    } else {
        $('.head-container header').removeClass('un-top');
    }
    if ($(document).scrollTop() < 500) {
        var scrollNum = $(document).scrollTop() / 2;
        bannerMove(scrollNum);
    }

    function bannerMove(num) {
        $('.banner-bg').css('background-position-y', num)
    }
})

// 返回顶部
$('.button .to-top').on('click', function() {
    var topLength = $(document).scrollTop();
    var toTop = setInterval(function() {
        if ($(document).scrollTop() > 0) {
            $(document).scrollTop(topLength -= 50)
        } else {
            clearInterval(toTop)
        }
    }, 10)
})