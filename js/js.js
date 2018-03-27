$(document).ready(function(){
  if($(window).width() <= 450){
    $( "#menu-content" ).css( "display", "none" );
  }else{
    $( "#menu-content" ).css( "display", "block" );
  }


  $(window).resize(function() {
   if($(window).width() <= 450){
     $( "#menu-content" ).css( "display", "none" );
     $(window).scroll(function(){
       $( "#menu-content" ).css( "display", "none" ).fadeOut( "slow" );
       console.log('scroll');
     });
   }else{
     $( "#menu-content" ).css( "display", "block" );
   }
});


    $("#menu").click(function(){
      $("#menu-content").toggle();
    });

});
