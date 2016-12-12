// 轮播功能
app.factory('banner', function() {
    return {
        showBanner: function(a, b) {
            var curr = 0;
            var banner = null;

            function play() {
                banner = setInterval(function() {
                    curr++;
                    if (curr == a.length) {
                        curr = 0;
                    }
                    show(curr);
                }, 5000);
            }
            play();

            function show(curr) {
                for (var i = 0; i < b.length; i++) {
                    b[i].index = i;
                    b[i].className = '';
                    a[i].className = '';
                }
                b[curr].className = 'current';
                a[curr].className = 'current';
            }

            for (i = 0; i < b.length; i++) {
                b[i].index = i;
                b[i].addEventListener('mouseover', function() {
                    clearInterval(banner);
                    curr = this.index;
                    show(curr);
                });
                b[i].addEventListener('mouseout', function() {
                    play();
                });
            }
        }
    }
})