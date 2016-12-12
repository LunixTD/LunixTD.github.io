        var startY;
        var hH = $('header').outerHeight();
        var h = $(window).height() - hH;
        var ul = $('nav ul');
        var ulH = ul.height();
        var liH = $('nav ul li').outerHeight();
        var container = $('.container');
        $('nav ul li').on('click', function() {
            var index = $(this).index();
            var lenH = index * liH;
            $('.content' + (index + 1)).show().siblings().hide();
            if (lenH > ulH - h) {
                lenH = ulH - h;
            }
            $(this).addClass('chose').siblings().removeClass('chose');
            $('nav ul').animate({
                'margin-top': -lenH
            }, 300);
            $('.container').animate({
                'margin-top': '0'
            }, 300);
        });

        function touch(el) {
            el.on('touchstart', function(ev) {
                ev.preventDefault();
                startY = ev.originalEvent.targetTouches[0].pageY;
            });
            el.on('touchmove', function(ev) {
                ev.preventDefault();
                var elH = el.height();
                var touch = ev.originalEvent.targetTouches[0];
                var marTop = $(this).css('margin-top');
                marTop = marTop.substring(0, marTop.length - 2);
                marTop = parseInt(marTop);
                if (marTop >= 100) {
                    marTop = 100;
                }
                if (marTop <= h - elH - 100) {
                    marTop = h - elH - 100;

                }
                var lenH = marTop + touch.pageY - startY;
                startY = touch.pageY;
                $(this).css('margin-top', lenH);
            });
            el.on('touchend', function(ev) {
                ev.preventDefault();
                var touch = ev.originalEvent.targetTouches[0];
                var marTop = $(this).css('margin-top');
                var elH = el.height();
                marTop = marTop.substring(0, marTop.length - 2);
                marTop = parseInt(marTop);
                if (marTop >= 0) {
                    $(this).animate({
                        'margin-top': '0'
                    }, 300);
                }
                if (marTop <= h - elH) {
                    $(this).animate({
                        'margin-top': h - elH
                    }, 300);
                }
            });
        }
        touch(ul);
        touch(container);
        $('.content').hide();
        $('.content1').show();

        // 搜索框
        $('header .search').on('focus', function() {
            $('#search-mask').show();
            $('#search-mask input').focus();
        })