function resize() {
    var width = $(window).width();
    switch ((width - width % 100) / 100) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            $('body').css('font-size', $('html').width() / 30 + 5 + 'px');
            break;
        case 5:
        case 6:
        case 7:
        case 8:
            $('body').css('font-size', $('html').width() / 36 + 5 + 'px');
            break;
        default:
            $('body').css('font-size', $('html').width() / 38 + 5 + 'px');
            break;
    }
    $('.banner').each(function(index) {
        $(this).height($(this).find('ul li').height())
    })
    $('.row-list').each(function(index) {
        $(this).find('ul').width($(this).find('ul li').width() * $(this).find('ul li').length);
    })
    $('.row-list').each(function(index) {
        $(this).height($(this).find('ul li').height());
    })
}