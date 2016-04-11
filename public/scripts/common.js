;(function(){
    $(document).scroll(function(){
        if($(document).scrollTop()>100){
            $(".g-hd").css("marginTop","-70px");
            $(".logo").css("marginTop","-30px");
        }else{
            $(".g-hd").css("marginTop","0");
            $(".logo").css("marginTop","0");
        }
    });
    $('.video-button').click(function(){
        $('body').append('<div class="mask"></div><div class="f-video"><div class="close">x</div><video src="../public/images/04.mp4" autoplay="autoplay" controls="controls" loop="false"></video></div>');
        $('.mask').fadeIn();
        $('.f-video').fadeIn();
    });
    $(document).on('click','.close',function(){
        $('.mask').fadeOut(600);
        $('.f-video').fadeOut(600);
        var timer = setTimeout(function(){
            $('.mask').remove();
            $('.f-video').remove();
        },600);
    });
    $(document).on('click','.mask',function(){
        $('.mask').fadeOut(600);
        $('.f-video').fadeOut(600);
        var timer = setTimeout(function(){
            $('.mask').remove();
            $('.f-video').remove();
        },600);
    });
})();