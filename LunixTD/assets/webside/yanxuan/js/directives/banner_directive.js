// 轮播图
app.directive('banner', function() {
    return {
        restrict: 'E',
        templateUrl: './tpl/banner.html',
        scope: {},
        controller: ['$scope', 'banner', function($scope, banner) {
            var bannerItem = document.querySelectorAll('.banner .banner-list li')
            var orderItem = document.querySelectorAll('.banner .order-list li')
            banner.showBanner(bannerItem, orderItem)
            $scope.showOrder = function() {
                document.querySelector('.banner .order-list ul').style.bottom = '0';
            }
            $scope.hideOrder = function() {
                document.querySelector('.banner .order-list ul').style.bottom = '-100%';
            }
        }],
        link: function(scope, ele, attr) {
            document.querySelectorAll('.banner .banner-list li a').forEach(function(item, index) {
                item.style.backgroundImage = 'url(./img/banner/banner' + (index + 1) + '.jpg';
            })
            document.querySelectorAll('.banner .order-list li').forEach(function(item, index) {
                item.style.backgroundImage = 'url(./img/banner/banner' + (index + 1) + '.jpg';
            })

        }
    }
})