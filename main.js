$(document).ready( function() {
  $('.home-content').css( 'padding-top', $('.nav').height() / 3 ); // Need to add the 2 em of the navs margin to this number
  $('.pricing-ui').css( 'padding-top', $('.nav').height() / 3 );


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



// Pricing UI

  // CurrentView:
  // 0 = device type select
  // 1 = device-model-select (IPHONE)
  // 2 = device-model-select (IPAD)
  // 3 = repair select
  // 4 = quote price display

  var VIEW_DEVICE_TYPE_SELECT         = 0;
  var VIEW_DEVICE_MODEL_SELECT_IPHONE = 1;
  var VIEW_DEVICE_MODEL_SELECT_IPAD   = 2;
  var VIEW_DEVICE_REPAIR_SELECT       = 3;
  var VIEW_QUOTE_PRICE                = 4;


  var currentView = VIEW_DEVICE_TYPE_SELECT;

  var DEVICE_TYPE_KEY = 'device-type';
  var MODEL_TYPE_KEY  = "model";
  var ISSUES_KEY      = 'issues';

  var uiState = {
    DEVICE_TYPE_KEY: "",
    MODEL_TYPE_KEY:"",
    ISSUES_KEY: []
  };

  var iphone = $('#iphone');
  var ipad = $('#ipad');

  iphone.click( function() {
    uiState[DEVICE_TYPE_KEY] = 'iphone';
    currentView = VIEW_DEVICE_MODEL_SELECT_IPHONE;

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
    uiState[DEVICE_TYPE_KEY] = 'ipad';
    currentView = VIEW_DEVICE_MODEL_SELECT_IPAD;

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

  $('.ui-back').click( function() {

    switch( currentView ) {
      case VIEW_DEVICE_MODEL_SELECT_IPHONE:
        $('.iphone-model-select').fadeOut( 'fast' );

        $('.ui-nav').fadeOut( 'fast' );
        setTimeout( function() {
          $('.device-type-select').fadeIn();
        }, 300 );


        break;
      case VIEW_DEVICE_MODEL_SELECT_IPAD:
        $('.ipad-model-select').fadeOut( 'fast' );

        $('.ui-nav').fadeOut( 'fast' );
        setTimeout( function() {
          $('.device-type-select').fadeIn();
        }, 300 );

        
        break;
    }



  } );

  $('.model').click( function() {
    var model = $(this).data();
    console.log( "Clicked model " + JSON.stringify( model ) );
  } );


});
