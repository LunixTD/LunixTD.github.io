 //            抢购倒计时
 function timer(hour, minute, second) {
     var hours = $('.go-title .hour');
     var minutes = $('.go-title .minute');
     var seconds = $('.go-title .second');
     var h = hour;
     var m = minute;
     var s = second;
     hours.text(h < 10 ? '0' + h : h);
     minutes.text(m < 10 ? '0' + m : m);
     seconds.text(s < 10 ? '0' + s : s);
     var time = setInterval(function() {
         s--;
         if (s == -1) {
             m--;
             s = 59;
             if (m == 0) {
                 h--;
             }
         }
         if (s == 0 && m == 0 && s == 0) {
             clearInterval(time);
         }
         hours.text(h < 10 ? '0' + h : h);
         minutes.text(m < 10 ? '0' + m : m);
         seconds.text(s < 10 ? '0' + s : s);
     }, 1000);
 }
 timer(1, 30, 0);

 //    商品Tab切换
 $('.go-time-goods').eq(0).show();
 $('.go-time>ul>li').on('click', function() {
     var index = $(this).index();
     $(this).addClass('chose').siblings().removeClass('chose');
     $('.go-time-goods').each(function(i) {
         $(this).hide();
         if (i == index) {
             $('.go-time-goods').eq(i).show();
         }
     })
     progress();
 })


 //   头部滚动悬浮
 $(window).on('scroll', function() {
     if ($(window).scrollTop() >= 100) {
         console.log('55');
         $('.go-time').addClass('go-time-fixed');
         $('header').css('margin-bottom', $('.go-time').height());
     } else {
         $('.go-time').removeClass('go-time-fixed');
         $('header').css('margin-bottom', 0);
     }
 })

 //  进度条动画效果
 function progress() {
     var per = $('.progress .percent');
     var progress = $('.progress em');
     progress.css('width','0');
     per.each(function(index) {
         progress.eq(index).animate({
             'width': $(this).text() + '%'
         }, 500)
     })
 }
 progress();