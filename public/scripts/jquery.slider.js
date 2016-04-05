;(function(){
  /*var $con = $('.m-slider');
  var timer = function(t,max){
    if(t<=max){
      t += 1
    }else {
      t = 0;
    }
    console.log(t);
  }
  var slider = function($container){
    var index = 0;
    var items = $container.find('.slider-item');
    setInterval(timer(index,3),1000);
  }
  slider($con);*/
  var slider = {
    $con : $('.slider-item'),
    index : 0,
    slide : function(index){
      this.$con.eq(index).siblings().animate({
        opacity : 0
      },1600);
      this.$con.eq(index).animate({
        opacity : 1
      },1600);
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
      this.$con.eq(0).css('opacity','1');
      this.$con.eq(0).siblings().css('opacity','0');
      setInterval(this.autoShow.bind(this),5000);
    }
  }
  slider.init();
})();
