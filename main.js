$(document).ready( function() {
  $('.home-content').css( 'padding-top', $('.nav').height() / 2 ); // Need to add the 2 em of the navs margin to this number
  $('.pricing-ui').css( 'padding-top', $('.nav').height() / 2 ); 

$(function() {
  $.scrollify({
    section: '.section',
    scrollbars: false,
    scrollSpeed: 1500,
    before: function( toSection ) {

      // currentSection = 1 means heading to the below section
      // currentSection of 0 means heading to the above home section

      if( toSection == 1 ) {

        //$('.home-content').fadeOut( 70 );
        $('.home-content').animate({opacity: 0}, 70);

        $('#home').animate( {color: '#ecf0f1'}, 300 );
        $('#pricing').animate({color: '#4484C8'}, 300 );

      } else if( toSection == 0 ) {

        setTimeout( function() {
          //$('.home-content').fadeIn();
          $('.home-content').animate({opacity: 1}, 500);

          $('#pricing').animate( {color: '#ecf0f1'}, 300 );
          $('#home').animate( {color: '#4484C8'}, 300 );

        }, 300 );

      }

    },
    after: function( currentSection ) {

      // currentSection = 1 means heading to the below section
      // currentSection of 0 means heading to the above home section

      /**
      if( currentSection == 0 ) {
        $('.home-content').fadeIn();
        $('#home').css( 'color', '#4484C8' );
        $('#pricing').css( 'color', '#ecf0f1' );
      } else {
        $('#pricing').css( 'color', '#4484C8' );
        $('#home').css( 'color', '#ecf0f1' );
      }
      */


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

} );

/**

$(window).scroll( function(event) {
  var scrollAmount = $(window).scrollTop();
});

*/
