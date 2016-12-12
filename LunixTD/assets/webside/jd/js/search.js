$('.search-title i').on('click', function() {
    var self = $(this);
    $(this).addClass('rotate');
    setTimeout(function() {
        self.removeClass('rotate');
    }, 1000)
})