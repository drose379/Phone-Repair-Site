$(document).ready( function() {
  $('.home-content').css( 'padding-top', $('.nav').height() / 2 ); // Need to add the 2 em of the navs margin to this number
  $('.pricing-ui').css( 'padding-top', $('.nav').height() / 2 );

/*
  console.log( $('#ipad').outerWidth() );
  $('#iphone').outerWidth( $('#ipad').outerWidth() );
*/

$(function() {
  $.scrollify({
    section: '.section',
    scrollbars: false,
    scrollSpeed: 1500,
    before: function( toSection ) {

      // currentSection = 1 means heading to the below section
      // currentSection of 0 means heading to the above home section

      if( toSection == 1 ) {

        $('.home-content').animate({opacity: 0}, 70);

        $('#home').animate( {color: '#ecf0f1'}, 300 );
        $('#pricing').animate({color: '#4484C8'}, 300 );

      } else if( toSection == 0 ) {

        setTimeout( function() {
          $('.home-content').animate({opacity: 1}, 500);

          $('#pricing').animate( {color: '#ecf0f1'}, 300 );
          $('#home').animate( {color: '#4484C8'}, 300 );

        }, 300 );

      }

    }
  });
});

  $('.arrow-down').click( function() {
    $.scrollify.next();
  } );

  $('#pricing').click( function() {
    $.scrollify.next();
  } );

  $('#home').click( function() {
    $.scrollify.previous();
  } );


  var iphone = $('#iphone');
  var ipad = $('#ipad');


  iphone.click( function() {
    iphone.css( 'background-color', 'rgba( 68, 132, 200, 0.5 )' );
    ipad.css( 'background-color', 'rgba( 255,255,255, 0.1 )' );

    setTimeout( function(){
      $('.device-type-select').fadeOut( 'fast' );
    }, 300 );

    setTimeout( function() {
      $('.iphone-model-select').fadeIn().css( 'display', 'flex' );
      $('.ui-nav').fadeIn().css( 'display', 'flex' );
    }, 500 );

  });



  ipad.click( function() {
    ipad.css( 'background-color', 'rgba( 68, 132, 200, 0.5 )' );
    iphone.css( 'background-color', 'rgba( 255,255,255, 0.1 )' );

    setTimeout( function(){
      $('.device-type-select').fadeOut( 'fast' );
    }, 300 );

    setTimeout( function() {
      $('.ipad-model-select').fadeIn();
      $('.ui-nav').fadeIn().css( 'display', 'flex' );
    }, 500 );

  });

  $('.ui-nav').click( function() {
    $('.iphone-model-select').fadeOut( 'fast' );
    $('.ipad-model-select').fadeOut( 'fast' );
    $('.ui-nav').fadeOut( 'fast' );
    setTimeout( function() {
      $('.device-type-select').fadeIn();
    }, 300 );
  } );


});
