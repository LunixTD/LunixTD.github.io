//            添加图片
var nav_img = $('#nav-top a span img');
var banner_img = $('.banner1 img');
var row_img = $('#miao .row-list img');
nav_img.each(function(index) {
    nav_img[index].src = 'images/icon/' + (index + 1) + '.png';
});
banner_img.each(function(index) {
    banner_img[index].src = "images/banner/banner" + (index + 1) + ".jpg";
});
row_img.each(function(index) {
    row_img[index].src = "images/goods/small/row_" + (index + 1) + ".jpg";
});

//            商品高度
var goodsH = $('ul.goods li img');
var rGoodsH = $('.row-list');
goodsH.height(goodsH.width());
rGoodsH.height(rGoodsH.find('li').height());

//            各种banner自适应
window.onload = function() {
    resize();
};
$(window).resize(function() {
    resize();
});
resize();



//            抢购倒计时
function timer(hour, minute, second) {
    var hours = $('#miao .hour');
    var minutes = $('#miao .minute');
    var seconds = $('#miao .second');
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

//            banner实例化
var ban1 = $('.banner1');
var ban2 = $('.banner2');
var ban3 = $('.banner3');
var ban4 = $('.banner4');
var ban5 = $('.banner5');
var dir = 'left';
var dir2 = 'top';
var banner = new Banner(ban1, dir, 5000);
var banner2 = new Banner(ban2, dir2, 3000);
var banner3 = new Banner(ban3, dir, 5000);
var banner4 = new Banner(ban4, dir, 5000);
var banner5 = new Banner(ban5, dir, 5000);

//            触摸横向列表
function RowList(ulEl) {
    var self = this;
    this.ul = $('.row-list ul') || ulEl;
    this.li = this.ul.find('li');
    this.num = this.li.length;
    this.ul.width(this.li.width() * this.num);
    this.lastX = 0;
    RowList.prototype.touchM = function() {
        this.ul.on('touchstart', function(ev) {
            ev.preventDefault();
            self.lastX = ev.originalEvent.targetTouches[0].pageX;
        });
        this.ul.on('touchmove', function(ev) {
            ev.preventDefault();
            if (self.ul.position().left >= $(window).width() - self.ul.width() && self.ul.position().left <= 0) {
                var touch = ev.originalEvent.targetTouches[0];
                var left = self.ul.position().left + touch.pageX - self.lastX;
                self.lastX = touch.pageX;
                self.ul.css('left', left);
            }
            if (self.ul.position().left > 0) {
                self.ul.css('left', '0');
            }
            if (self.ul.position().left < $(window).width() - self.ul.width()) {
                self.ul.css('left', $(window).width() - self.ul.width());
            }
        });
    };
    this.touchM();
}
var rowList = new RowList();

// 搜索框
$('#search').on('focus', function() {
    $('#search-mask').show();
    $('#search-mask input').focus();
})