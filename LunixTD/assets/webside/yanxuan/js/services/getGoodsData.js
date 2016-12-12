app.factory('goodsInfo',['$http',function($http){
    return{
        getGoodsData:function(callback,type){
            var url = './data/'+type+'.json'
            $http.get(url)
                .success(function(res){
                    callback(res)
                })
        }
    }
}])