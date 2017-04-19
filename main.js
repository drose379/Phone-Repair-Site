$(document).ready( function() {

  var nav = $('.nav').outerHeight(true);

  $('.home-content').css( 'padding-top', nav / 3 );
  $('.ui').css( 'padding-top', (nav / 2) );


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
  var VIEW_QUOTE_PRICE                = 3;

  var currentView = VIEW_DEVICE_TYPE_SELECT;

  var DEVICE_TYPE_KEY = 'device-type';
  var MODEL_TYPE_KEY  = "model";
  var ISSUES_KEY      = 'issues';

  var MODEL_IPHONE_4        = "iphone-4";
  var MODEL_IPHONE_4_S      = "iphone-4s"
  var MODEL_IPHONE_5        = "iphone-5";
  var MODEL_IPHONE_5_S      = "iphone-5s";
  var MODEL_IPHONE_5_C      = "iphone-5c";
  var MODEL_IPHONE_6        = "iphone-6";
  var MODEL_IPHONE_6_PLUS   = "iphone-6plus";
  var MODEL_IPHONE_6_S_PLUS = "iphone-6splus";
  var MODEL_IPHONE_SE       = "iphone-se";
  var MODEL_IPHONE_7        = "iphone-7";
  var MODEL_IPHONE_7_PLUS   = "iphone-7plus";

  var uiState = {};

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
        fadeOutUiNav();
        currentView = VIEW_DEVICE_TYPE_SELECT;
        break;
      case VIEW_DEVICE_MODEL_SELECT_IPAD:
        $('.ipad-model-select').fadeOut( 'fast' );
        fadeOutUiNav();
        currentView = VIEW_DEVICE_TYPE_SELECT;
        break;
      case VIEW_QUOTE_PRICE:
        $('.quote-section').fadeOut('fast');

        setTimeout( function() {
          if( uiState[DEVICE_TYPE_KEY] == 'iphone' ) {
            $('.iphone-model-select').fadeIn();
            currentView = VIEW_DEVICE_MODEL_SELECT_IPHONE;
          } else {
            $('.ipad-model-select').fadeIn();
            currentView = VIEW_DEVICE_MODEL_SELECT_IPAD;
          }
        }, 300 );

        break;
    }

  } );

  $('.model').click( function() {
    var model = $(this).data()['model'];

    $('.iphone-model-select').find( "[data-model='"+ uiState[MODEL_TYPE_KEY] +"']" ).css('background-color','rgba(255,255,255,0.1)');
    $('.ipad-model-select').find( "[data-model='"+ uiState[MODEL_TYPE_KEY] +"']" ).css('background-color','rgba(255,255,255,0.1)'); // not working need  to set data refs on ipas

    uiState[MODEL_TYPE_KEY] = model;

    $('#repair-title').html("WHAT DO YOU NEED FOR YOUR " + "<span class='accent'>" + $(this).data()['name'] + "</span>");


    // Need to de-select any other models, try to use from uiState[MODEL_TYPE] to grab by data attr


    $(this).css( 'background-color', 'rgba(68,132,200,0.5)' );


    setTimeout(function() {
      if( currentView == VIEW_DEVICE_MODEL_SELECT_IPHONE )
        $('.iphone-model-select').fadeOut( 'fast' );
      else
        $('.ipad-model-select').fadeOut( 'fast' );

      currentView = VIEW_QUOTE_PRICE;
    },300);


    setTimeout( function(){
      $('.quote-section').fadeIn().css( 'display', 'flex' );
    }, 500 );




  } );


  var repairCount = 0;

  /** Look into adding tooltip on repair button hovers */

  $('.repair-item').click( function() {
    var repair = $(this).data()['type'];
    if( repair != 'more')  {

      if( $(this).data()['selected'] ) {
        $(this).data( 'selected', false );
        $(this).removeClass( 'repair-item-selected' );
        repairCount--;
      } else {
        $(this).data( 'selected', true );
        $(this).addClass('repair-item-selected');
        repairCount++;
      }

      if( repairCount > 0 ) {
        $('.finish').css( 'opacity', 1 );
      } else {
        $('.finish').css( 'opacity', 0.3 );
      }
    }

    // NEED TO TAKE CARE OF STORING THE SELECTIONS AND REMOVALS IN uiState obj array

  } );

  var isAllShowing = false;
  $('#more').click(function() {
    if( isAllShowing ) {
      $('.secondary').fadeOut();
      $(this).removeClass('hide-more');
      $(this).addClass('show-more');
      $(this).html("<h3>MORE</h3>");
      isAllShowing = false;
    } else {
      $('.secondary').fadeIn().css('display','flex');
      $(this).removeClass('show-more');
      $(this).addClass('hide-more');
      $(this).html("<h3>LESS</h3>");
      isAllShowing = true;
    }
  });

  $('.scroll-container').hover( function() {
    $.scrollify.disable();
  }, function() {
    $.scrollify.enable();
  } );


// End document.ready
});


function fadeOutUiNav() {
  $('.ui-nav').fadeOut( 'fast' );
  setTimeout( function() {
    $('.device-type-select').fadeIn();
  }, 300 );
}
