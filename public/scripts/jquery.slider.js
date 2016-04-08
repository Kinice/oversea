;(function(){
  var slider = {
    $con : $('.slider-item'),
    index : 0,
    animateTime : 800,
    slideTime : 5000,
    createPoint : function(){

    },
    changePoint : function(index){

    },
    slide : function(index){
      this.$con.eq(index).siblings('.slider-item').animate({
        opacity : 0
      },this.animateTime);
      timer = setTimeout(function(){
          this.$con.eq(index).siblings('.slider-item').css('display','none');
      }.bind(this),this.animateTime);
      this.$con.eq(index).css('display','block');
      this.$con.eq(index).animate({
        opacity : 1
      },800);
    },
    autoShow : function(){
      this.index += 1;
      if(this.index <= 2 - 1){
          this.slide(this.index);
      }else{
          this.index = 0;
          this.slide(this.index);
      }
    },
    init : function(){
      var max = $('.slider-item').length;
      var isAnimating = false;
      this.$con.eq(0).css('opacity','1');
      this.$con.eq(0).siblings('.slider-item').css('opacity','0');
      intimer = setInterval(this.autoShow.bind(this),this.slideTime);

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
                    this.slide(this.index);
                }else{
                    this.index = 0;
                    this.slide(this.index)
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
                    this.slide(this.index);
                } else {
                    this.slide(this.index)
                }
                setTimeout(function(){
                    isAnimating = false;
                },this.animateTime);
                console.log(this.index);
            }else{
                return false;
            }
        }.bind(this));
    }
  }
  slider.init();
})();
