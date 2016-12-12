var app = angular.module('app', ['ui.router', 'ngRoute'])

app.controller('home', ['$scope', 'goodsInfo', '$http', '$location', function($scope, goods, $http, $location) {
    goods.getGoodsData(function(res) {
        $scope.data = res
            // console.dir(res)
    }, 'home');
}])
app.controller('sort', ['$scope', 'goodsInfo', '$http', '$stateParams', function($scope, goods, $http, $stateParams) {
    var type = $stateParams.type
    goods.getGoodsData(function(res) {
        $scope.data = res
        $scope.sort = type
    }, type);
    goods.getGoodsData(function(nav) {
        nav.forEach(function(item, index) {
            if (item.navId == type) {
                $scope.navList = item.nav
                $scope.sortName = item.title
            }
        })
    }, 'nav');
}])

// 路由
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'tpl/index.html',
            controller: 'home'
        })
        .state('sort', {
            url: '/sort/*type',
            templateUrl: 'tpl/sort.html',
            controller: 'sort'
        })
    $urlRouterProvider.otherwise('/');
}])