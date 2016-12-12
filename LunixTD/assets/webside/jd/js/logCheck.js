$(window).on('load', function() {
    $('.content input').each(function() {
        $(this).val('');
    })
});
var pStatus = remStatus = 'hide';
$('.content .checkbtn').on('click', function() {
    if (pStatus == 'hide') {
        $(this).css({
            'background-color': '#f23030',
            'border-color': '#f23030'
        });
        $(this).removeClass('btn-left').addClass('btn-right');
        $(this).find('span').css('color', 'white');
        $(this).siblings('input').attr('type', 'text');
        pStatus = remStatus = 'show';
    } else {
        $(this).css({
            'background-color': 'white',
            'border-color': '#e3e5e9'
        });
        $(this).removeClass('btn-right').addClass('btn-left');
        $(this).find('span').css('color', 'rgba(0,0,0,0.2)');
        $(this).siblings('input').attr('type', 'password');
        pStatus = remStatus = 'hide';
    }
});
$('.content .log').on('click', function() {
    if (remStatus == 'hide') {
        $(this).find('.iconBg').css('background-position', '0 -106px');
        remStatus = 'show';
    } else {
        $(this).find('.iconBg').css('background-position', '0 -85px');
        remStatus = 'hide';
    }
});
//        input删除按钮和登录、注册按钮样式改变
var input;

function checkInput(el) {
    var status;
    input = el;
    var length = input.length;
    if ($('.content .phone input').length != 0) {
        if ($('.content .phone input').val().length == 4) {
            $('.content .sendCode').css({
                'color': 'white',
                'background-color': '#f23030'
            })
        } else {
            $('.content .sendCode').css({
                'color': '#848689',
                'background-color': '#eee'
            });
        }
    }

    for (var i = 0; i < length; i++) {
        if (input.eq(i).val() != '') {
            status = 'true';
        } else {
            status = 'false';
            break;
        }
    }
    if (status == 'true') {
        $('.content a#loginBtn').css({
            'color': 'white',
            'background-color': '#f23030'
        });
        status = 'false';
    } else {
        $('.content a#loginBtn').css({
            'color': '#848689',
            'background-color': '#eee'
        });
        status = 'true';
    }
}
$('.content .input input').on('focus', function(ev) {
    var inputV = $(ev.target).val();
    $(ev.target).next().css('display', 'block');
    $(window).on('keyup', function() {
        checkInput(input);
    });
});
$('.content .input input').on('blur', function(ev) {
    setTimeout(function() {
        $(ev.target).next().css('display', 'none');
    }, 100);
});
$('.content .input i').on('click', function() {
    $(this).prev().val('');
    if ($('.content .phone input').val().length == 4) {
        $('.content .sendCode').css({
            'color': 'white',
            'background-color': '#f23030'
        })
    } else {
        $('.content .sendCode').css({
            'color': '#848689',
            'background-color': '#eee'
        });
    }
});