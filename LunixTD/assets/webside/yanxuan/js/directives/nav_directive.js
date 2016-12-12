// 获取导航信息
app.directive('mainNav', function() {
    return {
        restrict: 'E',
        templateUrl: './tpl/nav.html',
        scope: {},
        controller: ['$scope', 'goodsInfo', function($scope, goods) {
            goods.getGoodsData(function(res) {
                $scope.nav = res
            }, 'nav')
        }]
    }
})

// 导航hover
app.directive('mouseOverOut', function() {
    return {
        restrict: 'A',
        scope: {
            hover: '='
        },
        link: function(scope, ele, attr) {
            scope.hover = false;
            ele.bind('mouseover', function() {
                scope.$apply(function() {
                    scope.hover = true;
                })
                ele[0].querySelector('.nav-mini').classList.add('navMini-in')
            })
            ele.bind('mouseout', function() {
                    ele[0].querySelector('.nav-mini').classList.add('navMini-out')
                    scope.$apply(function() {
                        scope.hover = false;
                    })
                    ele[0].querySelector('.nav-mini').classList.remove('navMini-in', 'navMini-out')
                })
                // 导航固定顶部
            document.onscroll = function() {
                    var nav = document.querySelector('header nav')
                    var header = document.querySelector('header')
                    var offset = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY
                    if (offset > 242) {
                        nav.classList.add('nav-fixed')
                        header.style.paddingBottom = '76px';
                    }
                    if (offset <= 170) {
                        nav.classList.remove('nav-fixed')
                        header.style.paddingBottom = '0';
                    }
                }
                // 导航点击样式变化
            document.querySelectorAll('nav .nav li').forEach(function(item, index) {
                item.addEventListener('click', function(ev) {
                    var li = ev.currentTarget
                    document.querySelectorAll('nav .nav li').forEach(function(item, index){
                        item.classList.remove('nav-on')
                    })
                    li.classList.add('nav-on')
                }, true)
            })
        }
    }
})