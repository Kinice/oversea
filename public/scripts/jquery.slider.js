;(function(){
  var $con = $('.m-slider');
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
  slider($con);
})();
