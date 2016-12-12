$(function(){
    function topNav(){
        var status = 'close';
        $('header .topNav').on('click',function(){
            if(status == 'close'){
                $('.navToggle ul').css('display','block');
                status = 'open';
            }
            else{
                $('.navToggle ul').css('display','none');
                status = 'close';
            }
        })
    }
    topNav();
});