
    $('.goods .num-list input').val('1');
    // 单选变换以及全选判断
    var titleIcon = $('.shop-title .icon');
    var goodsIcon = $('.shop-goods .icon');
    var allIcon = $('.icon');
    var list = $('.shop-list');
    var footerIcon = $('.shop-footer .icon');
    allIcon.each(function() {
        this.status = 'true';
    });

    // 给购物车商品分类分配索引值，以便分类标题块和分类商品块一一对应
    function setNum(el) {
        var i = 0;
        el.each(function() {
            this.index = i;
            i++;
        })
    }
    setNum(titleIcon);
    setNum(list);
    // 传入标题块索引，返回对应的商品块
    function getEl(el, num) {
        var reEl;
        el.each(function() {
            if (this.index == num) {
                reEl = this;
                return false;
            }
        });
        return reEl;
    }
    //绑定点击事件
    titleIcon.on('click', function() {
        var target = getEl(list, this.index);
        iconChangeAll($(target).find('.icon'), this.status);
    });
    footerIcon.on('click', function() {
        iconChangeAll(goodsIcon, this.status);
    });
    allIcon.on('click', function() {
        iconChangeSingle(this);
        price();
        var isAllStatus;
        var allStatus = Array();
        var i = 0;
//                遍历小分块，遍历小分块中的商品，判断商品是否全部被勾选，将状态值放入数组中
        list.each(function() {
            isAllStatus = isAllChose($(this).find('.icon'));
            allStatus[i] = isAllStatus;
            i++;
        });
//                传入勾选状态数组
        handleIcon(allStatus);
    });
//            传入单个对象，执行切换
    function iconChangeSingle(el,status) {
        if(status != undefined){
            if(status == 'true'){
                $(el).css('background-position', '-25px 0');
                el.status = 'true';
            }
            else{
                $(el).css('background-position', '0 0');
                el.status = 'false';
            }
        }
        else{
            if (el.status == 'true') {
                $(el).css('background-position', '0 0');
                el.status = 'false';
            } else {
                $(el).css('background-position', '-25px 0');
                el.status = 'true';
            }
        }

    }
//            传入多个对象，执行切换
    function iconChangeAll(el, std) {
        if ($(el).length > 1) {
            if (std == 'true') {
                el.each(function() {
                    $(this).css('background-position', '0 0');
                    this.status = 'false';
                })
            } else {
                el.each(function() {
                    $(this).css('background-position', '-25px 0');
                    this.status = 'true';
                })
            }
        }
    }
//            传入多个对象，判断是否全选状态
    function isAllChose(el) {
        var allStatus = 'true';
        el.each(function() {
            if (this.status == 'false') {
                allStatus = 'false';
                return false;
            }
        });
        return allStatus;
    }
//            传入状态数组，根据状态执行响应处理
    function handleIcon(arr){
        var allIconStatus = 'true';
        for(var j = 0;j < arr.length;j++){
            var el = getEl(titleIcon,j);
            iconChangeSingle(el,arr[j]);
            if(arr[j] == 'false'){
                allIconStatus = 'false';
            }
        }
        iconChangeSingle(footerIcon,allIconStatus);
    }

    //总价格处理
    setNum($('.shop-list input'));
    setNum($('.shop-goods li'));
    //设置第一个商品的单件折扣
    $('.shop-goods li')[0].discount = 50;
    function price(){
        var price = 0;
        var fPrice = 0;
        var discount = 0;
        var iconsStatus = Array();
        var i = num =0;
        $('.shop-list li .icon').each(function(){
            iconsStatus[i] = this.status;
            i++;
        });
        for(i = 0;i < iconsStatus.length;i++){
            var str;
            if(iconsStatus[i] == 'true'){
                var liEl = getEl($('.shop-goods li'),i);
                var inpEl = getEl($('.shop-list input'),i);
                str = $(liEl).find('.price').text();
                str = str.slice(1);
                if($('.shop-goods li')[i].discount != undefined){
                    discount += $('.shop-goods li')[i].discount*$(inpEl).val();
                }
                price = price + str*$(inpEl).val();
                num += 1*$(inpEl).val();
            }
        }
        fPrice = price - discount;
        fPrice = fPrice.toFixed(2);
        price = price.toFixed(2);
        if(price == 0){
            price = '0.00';
        }
        $('.shop-footer .money span strong').text(fPrice);
        $('.shop-footer .result small').text('('+num+')');
        $('.shop-footer .count span').eq(0).text(price);
        $('.shop-footer .count span').eq(1).text(discount);
    }
    price();