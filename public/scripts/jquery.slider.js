;(function(){
  var slider = {
    $con : $('.slider-item'),
    index : 0,
    animateTime : 800,
    slideTime : 5000,
    createPoint : function(){
      var max = $('.slider-item').length;
      for(var i = 0; i < max; i++){
        $('.pointer').append('<span></span>');
      }
      $('.pointer').find('span').eq(0).addClass('checked');
    },
    changePoint : function(index){
      $('.pointer').find('span').removeClass();
      $('.pointer').find('span').eq(index).addClass('checked');
    },
    fade : function(index){
      this.changePoint(index);
      this.$con.eq(index).siblings('.slider-item').animate({
        opacity : 0
      },this.animateTime);
      timer = setTimeout(function(){
          this.$con.eq(index).siblings('.slider-item').css('display','none');
      }.bind(this),this.animateTime);
      this.$con.eq(index).css('display','block');
      this.$con.eq(index).animate({
        opacity : 1
      },this.animateTime);
    },
    autoShow : function(){
      this.index += 1;
      if(this.index <= 2 - 1){
          this.fade(this.index);
      }else{
          this.index = 0;
          this.fade(this.index);
      }
    },
    init : function(){
      var max = $('.slider-item').length;
      var isAnimating = false;
      this.$con.eq(0).css('opacity','1');
      this.$con.eq(0).siblings('.slider-item').css('opacity','0');
      intimer = setInterval(this.autoShow.bind(this),this.slideTime);
      this.createPoint();
        $('.g-slider').hover(function(){
            clearInterval(intimer);
        },function(){
            intimer = setInterval(this.autoShow.bind(this),this.slideTime);
        }.bind(this));
        $('.arrow-r').click(function(){
            if(!isAnimating){
                isAnimating = true;
                this.index += 1;
                if(this.index <= max-1){
                    this.fade(this.index);
                }else{
                    this.index = 0;
                    this.fade(this.index)
                }
                setTimeout(function(){
                    isAnimating = false;
                },this.animateTime);
            }else{
                return false;
            }
        }.bind(this));

        $('.arrow-l').click(function(){
            if(!isAnimating) {
                isAnimating = true;
                this.index -= 1;
                if (this.index < 0) {
                    this.index = max - 1;
                    this.fade(this.index);
                } else {
                    this.fade(this.index)
                }
                setTimeout(function(){
                    isAnimating = false;
                },this.animateTime);
            }else{
                return false;
            }
        }.bind(this));
/*
        $('.pointer span').on('click',function(){
          if(!isAnimating){
            var nowIndex = $(this).index();
            isAnimating = true;
            slider.slide(nowIndex);
            setTimeout(function(){
                isAnimating = false;
            },this.animateTime);
          }else{
            return false;
          }
        }); */
    }
  }
  slider.init();
})();
