

$(document).ready(function(){

  $("#menu").on("change",function(){
    if(this.checked){
      $(".header__nav").css( "display", "flex" );
      $(this).siblings('label').html("&#10005;"); // cross
    }else{
      $( ".header__nav" ).css( "display", "none" );
      $(this).siblings('label').html("&#9776;");
    }
    });

 // check the size when first loaded
  if($(window).width() <= 768){
    $(window).scroll(function(){
      $( ".header__nav" ).css( "display", "none" ).fadeOut( "slow" );
      $("#menu-label").html("&#9776;");
      // console.log('450 scroll',$(window).width());
    });
   }else{
    $( ".header__nav" ).css( "display", "flex" );
  }

 // check the size when scrolling
  $(window).scroll(function(){
    if($(window).width() <= 768){
       $( ".header__nav" ).css( "display", "none" ).fadeOut( "slow" );
       $("menu-label").html("&#9776;");
      //  console.log('resize scroll',$(window).width());
      }
    else{$( ".header__nav" ).css( "display", "flex" );
    // console.log('Large screen resize scroll',$(window).width());
   }
 });

 //check the size when resizing
  $(window).resize(function() {
    if($(window).width() > 768){
      $( ".header__nav" ).css( "display", "flex" );
      // console.log('resize',$(window).width());
    }else{
     $( ".header__nav" ).css( "display", "none" );
    }
  });


});
