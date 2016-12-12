var Crawler = require("crawler");
var fs = require('fs')
// 引入模块 连接数据库

var page = 0;
var nav_url = [];
// 创建一个爬虫实例
var c = new Crawler({
    maxConnections: 10,
    // 网站编码转换
    forceUTF8: true,
    incomingEncoding: 'utf-8',
    // 获取网页html代码成功后的回调函数
    callback: function(error, result, $) {
        var arr = []
        var str = '';
        $('.g-row .g-constraint #j-filterResult .m-items').each(function(index, item) {
            var obj = {}
            obj.title = $(item).find('header p .name').text() //标题
            obj.desc = $(item).find('header .desc').text().replace(/\n/g,"") //副标题
            obj.img = $(item).find('header .title img').attr('src')
            // 商品信息
            obj.goods = []
            $(item).find('.bd ul li').each(function(index,item){
                var objGoods = {}
                objGoods.name = $(item).find('.bd h4 .name').text().replace(/\n/g,"")
                objGoods.price = $(item).find('.price span').text()
                objGoods.desc = $(item).find('.desc').text()
                objGoods.img = $(item).find('.hd a img').attr('data-original')
                objGoods.link = 'http://you.163.com'+$(item).find('.hd a').attr('href')
                obj.goods.push(objGoods)
            })
            arr.push(obj)
        });
        str = JSON.stringify(arr);
        fs.writeFile('./data/other.json',str,function(err,data){
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })
    }
});

// 爬取制定网址的html代码    
var url = 'http://you.163.com/item/list?categoryId=1019000';
c.queue(url);


