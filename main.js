var VIEW_HOME                       = 0;
var VIEW_DEVICE_TYPE_SELECT         = 1;
var VIEW_DEVICE_MODEL_SELECT_IPHONE = 2;
var VIEW_DEVICE_MODEL_SELECT_IPAD   = 3;
var VIEW_QUOTE_PRICE                = 4;
var VIEW_CONTACT                    = 5;

var currentView = VIEW_HOME;


$(document).ready( function() {

  var nav = $('.nav').outerHeight(true);

  if( $(window).width() > 1000 ) {
    //$('.home-content').css( 'padding-top', nav / 3 );
  }

  $('.ui').css( 'padding-top', (nav / 2) );
  $('.contact').css( 'padding-top', (nav / 3) );

  //window.location.hash = 'home';

  var navItems = [$('#home'), $('#pricing'), $('#contact')];

$('#fullPage').fullpage({
  verticalCentered: false,
  normalScrollElements: '.scroll-container',
  onLeave: function( index, nextIndex, direction ) {

    if( index == 1 ) {
      $('.home-content').fadeOut( 100 );
    }

    if( nextIndex == 1 ) {
      $('.home-content').fadeIn();
    }

    // Need to unhighlight the current (index) and highlight the (nextIndex) in the nav bar
    navItems[index-1].css( 'color', '#ecf0f1' );
    navItems[nextIndex-1].css( 'color', '#4484C8' );

    switch( nextIndex ) {
      case 1:
        currentView = VIEW_HOME;
        break;
      case 2:
        currentView = VIEW_QUOTE_PRICE;
        break;
      case 3:
        currentView = VIEW_CONTACT;
        break;
    }

  }

});

// Handle nav clicks here
$( '#home' ).click( function() {

  if( currentView == VIEW_CONTACT ) {
    $.fn.fullpage.moveSectionUp();
    $.fn.fullpage.moveSectionUp();
  } else {
    $.fn.fullpage.moveSectionUp();
  }

  currentView = VIEW_HOME;
} );

$( '#pricing' ).click( function() {

  if( currentView == VIEW_CONTACT ) {
    $.fn.fullpage.moveSectionUp();
  } else {
    $.fn.fullpage.moveSectionDown();
  }

  currentView = VIEW_QUOTE_PRICE;

} );

$('#contact').click( function() {
  if( currentView == VIEW_HOME ) {
    $.fn.fullpage.moveSectionDown();
    $.fn.fullpage.moveSectionDown();
  } else {
    $.fn.fullpage.moveSectionDown();
  }

  currentView = VIEW_CONTACT;
} );


/*
$(function() {
  $.scrollify({
    section: '.section',
    scrollbars: false,
    scrollSpeed: 1500,
    updateHash: false,
    touchScroll: false,
    before: function( toSection ) {

      // currentSection = 1 means heading to the below section
      // currentSection of 0 means heading to the above home section

      if( toSection == 1 ) {

        window.location.hash = 'pricing';

        $('.home-content').animate({opacity: 0}, 70);

        $('#home').animate( {color: '#ecf0f1'}, 300 );
        $('#pricing').animate({color: '#4484C8'}, 300 );

      } else if( toSection == 0 ) {

        window.location.hash = 'home';

        setTimeout( function() {
          $('.home-content').animate({opacity: 1}, 500);

          $('#pricing').animate( {color: '#ecf0f1'}, 300 );
          $('#home').animate( {color: '#4484C8'}, 300 );

        }, 300 );

      }

    }
  });
});
*/
/*
  $('.arrow-down').click( function() {
    $.scrollify.next();
  } );
  $('#pricing').click( function() {
    $.scrollify.next();
  } );
  $('#home').click( function() {
    $.scrollify.previous();
  } );
  */



// Pricing UI

  // CurrentView:
  // 0 = device type select
  // 1 = device-model-select (IPHONE)
  // 2 = device-model-select (IPAD)
  // 3 = repair select
  // 4 = quote price display


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

    // update hash pricing/iphone

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
    $('#deviceInput').val( $(this).data()['name'] );
    // get name from here

    $('.iphone-model-select').find( "[data-model='"+ uiState[MODEL_TYPE_KEY] +"']" ).css('background-color','rgba(255,255,255,0.1)');
    $('.ipad-model-select').find( "[data-model='"+ uiState[MODEL_TYPE_KEY] +"']" ).css('background-color','rgba(255,255,255,0.1)'); // not working need  to set data refs on ipas

    uiState[MODEL_TYPE_KEY] = model;

    $(this).css( 'background-color', 'rgba(68,132,200,0.5)' );

    /**
     * THIS IS AN ASYNC REQUEST
     * INSTEAD OF MAKING REQUEST WHEN ITEM IS CLICKED, MAKE REQUEST ON PAGE LOAD AND STORE IT IN VARIABLE, THEN WHEN MODEL CLICK, POPULATE
    */
    $.getJSON(
      'http://dylanrose.me/Phone-Repair-Site/get-device-info.php',
      function( deviceMap ) {
        $('.scroll-container').empty();
        var deviceInfo = JSON.parse( deviceMap )[model];
        var deviceName = deviceInfo.name;
        $('#device-name').text( deviceName );
        $.each( deviceInfo.repairs, function(index,element) {
          var repairTitle = deviceInfo.repairs[index].name;
          var repairPrice = deviceInfo.repairs[index].price;
          $('.scroll-container').append(
            '<div class="row repair-item hoverable-repair"><h2 class="repair-title">'+repairTitle+'</h2><h2 class="repair-price accent">'+repairPrice+'</h2></div>'
          );
        });


        $('.repair-item').click( function() {
          console.log( $(this).find('.repair-title').text());
          $('#repairInput').val( $(this).find( '.repair-title' ).text() );
          $( '#priceInput' ).val( $(this).find( '.repair-price' ).text() );
          $.fn.fullpage.moveSectionDown();
        } );


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

      }
    );

  } );


  var repairCount = 0;

  /** Look into adding tooltip on repair button hovers */

  $('.hoverable-repair').click( function() {
    console.log( 'Repaur click' );
  } )


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


// End document.ready
});


window.onhashchange = function() {
  if( window.location.hash == '#home' ) {
    //$.scrollify.previous();
    //$.scrollify.previous();
    console.log( 'home' );
  }
};



function fadeOutUiNav() {
  $('.ui-nav').fadeOut( 'fast' );
  setTimeout( function() {
    $('.device-type-select').fadeIn();
  }, 300 );
}
