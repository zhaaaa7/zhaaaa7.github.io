$(document).ready(function(){

  $("#menu").on("change",function(){
    if(this.checked){
      $("#menu-content").css( "display", "block" );
      $(this).siblings('label').html("&#10539;"); // cross
    }else{
      $( "#menu-content" ).css( "display", "none" );
      $(this).siblings('label').html("&#9776;");
    }
    });


  if($(window).width() <= 450){
    $(window).scroll(function(){
      $( "#menu-content" ).css( "display", "none" ).fadeOut( "slow" );
      $('label').html("&#9776;");
      console.log('450 scroll',$(window).width());
    });
   }else{
    $( "#menu-content" ).css( "display", "block" );
  }


  $(window).scroll(function(){
    if($(window).width() <= 450){
       $( "#menu-content" ).css( "display", "none" ).fadeOut( "slow" );
       $('label').html("&#9776;");
       console.log('resize scroll',$(window).width());
      }
    else{$( "#menu-content" ).css( "display", "block" );
    console.log('Large screen resize scroll',$(window).width());
   }
 });

  $(window).resize(function() {
    if($(window).width() > 450){
      $( "#menu-content" ).css( "display", "block" );
      console.log('resize',$(window).width());
    }else{
     $( "#menu-content" ).css( "display", "none" );
    }
  });



});
