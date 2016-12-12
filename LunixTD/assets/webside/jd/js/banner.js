
    function Banner(banEl, direct, time) {
        var self = this;
        this.ban = banEl;
        this.li = this.ban.find('ul li');
        this.dot = this.ban.find('.banner-dot span');
        this.num = this.li.length - 1;
        this.curr = 0;
        this.dir = direct;
        this.time = time;
        this.ban.height(this.li.height());

        Banner.prototype.show = function(p, c, n) {
            this.li.css({
                [this.dir] : '200%',
                'z-index': '9'
            });
            this.li.eq(p).css({
                [this.dir] : '-100%',
                'z-index': '10'
            });
            this.li.eq(c).css({
                [this.dir] : '0',
                'z-index': '10'
            });
            this.li.eq(n).css({
                [this.dir] : '100%',
                'z-index': '10'
            });
            this.dot.eq(c).addClass('dotted').siblings().removeClass('dotted');
        };

        Banner.prototype.play = function(c) {
            var curr = c,
                prev = this.num,
                next = 1;
            this.show(prev,curr,next);
            this.ban_auto = setInterval(function() {
                curr++;
                prev = (curr - 1);
                next = (curr + 1);
                if (curr > self.num) {
                    curr = 0;
                    next = 1;
                }
                if (curr == self.num) {
                    next = 0;
                }
                if (curr <= 0) {
                    prev = self.num;
                }
                self.show(prev,curr,next);
            }, this.time);
        };
        this.play(this.curr);
    }