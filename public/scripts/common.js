;(function(){
    $(document).scroll(function(){
        if($(document).scrollTop()>100){
            $(".g-hd").css("marginTop","-77.5px");
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
    var oriTitle = document.title;
    console.log(oriTitle);
    (function(){
        var hidden,state,visibilityChange;
        if(typeof document.hidden !=='undefined'){
            hidden = 'hidden';
            visibilityChange = 'visibilitychange';
            state = 'visibilityState';
        }else if(typeof document.mozHidden !=='undefined'){
            hidden = 'mozHidden';
            visibilityChange = 'mozvisibilitychange';
            state = 'mozVisibilityState';
        }else if(typeof document.webkitHidden !=='undefined'){
            hidden = 'webkitHidden';
            visibilityChange = 'webkitvisibilitychange';
            state = 'webkitVisibilityState';
        }else if(typeof document.msHidden !=='undefined'){
            hidden = 'msHidden';
            visibilityChange = 'msvisibilitychange';
            state = 'msVisibilityState';
        }
        console.log(hidden+','+visibilityChange+','+state);
        document.addEventListener(visibilityChange,function(){
            var h = event.target[hidden];
            if(h){
                document.title='(｡・`ω´･)'+oriTitle;
            }else{
                document.title = oriTitle;
            }
        },true);
    }());
}());