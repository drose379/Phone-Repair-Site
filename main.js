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

  var navOrigPaddingTop = $('.nav').css('padding-top');
  var navItems = [$('#home'), $('#pricing'), $('#contact')];

$('#fullPage').fullpage({
  verticalCentered: false,
  normalScrollElements: '.scroll-container',
  onLeave: function( index, nextIndex, direction ) {

    if( nextIndex != 1 ) {
      $('.nav').animate( {'padding-top': 10}, 300 );
    } else {
      $('.nav').animate( {'padding-top': navOrigPaddingTop}, 300 );
    }

    if( index == 1 ) {
      $('.home-content').fadeOut( 100 );
    }

    if( nextIndex == 1 ) {
      $('.home-content').fadeIn();
    }

    if( nextIndex == 3 ) {
      $('.ui').fadeOut(100);
    }

    if( nextIndex == 2 ) {
      $('.ui').fadeIn();
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
    $('#deviceType').val( $(this).data()['name'] );
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
          $('#repairType').val( $(this).find( '.repair-title' ).text() );
          $( '#priceVal' ).text( $(this).find( '.repair-price' ).text() );
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

  $('.shipping-button').click(function() {
    var check = $(this).find('.checked');
    var label = $(this).find('h4');

    $(this).css('border','3px solid #4484C8');

    //label.animate( {'margin-right': 30}, 50 );
    check.animate( {opacity: 1}, 50 );


    var out;
    var outLabel;
    var outCheck;

    if( $(this).data()['type'] == 'local' ) {
      out = $('#mailinSelect');
      outLabel = $('#mailinSelect').find('h4');
      outCheck = $('#mailinSelect').find('.checked');
    } else {
      out = $('#localSelect');
      outLabel = $('#localSelect').find('h4');
      outCheck = $('#localSelect').find('.checked');
    }

    out.css( 'border', '3px solid rgba(255,255,255, 0.2)' );
    //outLabel.animate( {'margin-right': 0}, 50 );
    outCheck.animate( {opacity: 0}, 50);



  });

  /*
  $('.shipping-button').click( function() {
    var check = $(this).find('.checked');
    var label = $(this).find('h4');

    $(this).css('border','3px solid #4484C8');

    label.animate({'margin-right': 10},50);
    setTimeout(function(){
      check.fadeIn();
    },50);

    if( $(this).data()['type'] == 'mailin' ) {
      var localCheck = $('#localSelect').find('.checked');
      var localLabel = $('#localSelect').find('h4');

      $('#localSelect').css('border','3px solid rgba(255,255,255, 0.2)');
      localLabel.css('margin-right', 0);

      localCheck.fadeOut();
      //localLabel.animate({'margin-right': 10},5);

    } else {
      var mailinCheck = $('#mailin').find('.checked');
      var mailinLabel = $('#mailin').find('h4');

      $('#mailin').css('border','3px solid rgba(255,255,255, 0.2)');
      mailinLabel.css('margin-right', 0);

      mailinCheck.fadeOut();
    }

  });
*/


  var repairCount = 0;



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
