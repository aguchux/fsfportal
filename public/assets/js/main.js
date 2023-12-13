(function ($) {
  "use strict";

  $(document).ready(function () {
    /**-----------------------------
     *  Navbar fix
     * ---------------------------*/
    $("body").delegate(
      ".navbar-area .navbar-nav li.menu-item-has-children>a",
      "click",
      function (e) {
        e.preventDefault();
      }
    );

    /*-------------------------------------
            menu
        -------------------------------------*/
    $("body").delegate(".navbar-area .menu", "click", function () {
      $(this).toggleClass("open");
      $(".navbar-area .navbar-collapse").toggleClass("sopen");
    });

    // mobile menu
    if ($(window).width() < 992) {
      $(".in-mobile").clone().appendTo(".sidebar-inner");
      $(".in-mobile ul li.menu-item-has-children").append(
        '<i class="fas fa-chevron-right"></i>'
      );
      $('<i class="fas fa-chevron-right"></i>').insertAfter("");

      $("body").delegate(".menu-item-has-children a", "click", function (e) {
        // e.preventDefault();

        $(this).siblings(".sub-menu").animate(
          {
            height: "toggle",
          },
          300
        );
      });
    }

    var menutoggle = $(".menu-toggle");
    var mainmenu = $(".navbar-nav");

    $("body").delegate(".menu-toggle", "click", function () {
      if (menutoggle.hasClass("is-active")) {
        mainmenu.removeClass("menu-open");
      } else {
        mainmenu.addClass("menu-open");
      }
    });

    /*----------------------
            Search Popup
        -----------------------*/
    var bodyOvrelay = $("#body-overlay");
    var searchPopup = $("#search-popup");
    var accountForm = $("#accountForm");

    $("body").delegate("#body-overlay", "click", function (e) {
      e.preventDefault();
      bodyOvrelay.removeClass("active");
      searchPopup.removeClass("active");
      accountForm.removeClass("active");
    });
    $("body").delegate("#search", "click", function (e) {
      e.preventDefault();
      searchPopup.addClass("active");
      bodyOvrelay.addClass("active");
    });

    $("body").delegate("#account", "click", function (e) {
      e.preventDefault();
      accountForm.addClass("active");
      bodyOvrelay.addClass("active");
    });

    /**-----------------------------
     * Signin Signup PopUp
     * ---------------------------*/
    $("body").delegate(".user", "click", function (e) {
      e.preventDefault();
      $(".signin-signup-popup").addClass("active");
      $(".body-overlay").addClass("active");
    });

    $("body").delegate("#body-overlay", "click", function (e) {
      e.preventDefault();
      $(".signin-signup-popup").removeClass("active");
      $(".body-overlay").removeClass("active");
    });

    $("body").delegate(".when-click-change-signup", "click", function (e) {
      e.preventDefault();
      $(".signup-part").addClass("part-active");
      $(".signin-part").addClass("part-hide");
    });

    $("body").delegate(".when-click-change-signin", "click", function (e) {
      e.preventDefault();
      $(".signup-part").removeClass("part-active");
      $(".signin-part").removeClass("part-hide");
    });

    /*--------------------------------------------------
            select onput
        ---------------------------------------------------*/
    $(document).ready(function () {
      $("select").niceSelect();
    });
    /* -----------------------------------------------------
            Variables
        ----------------------------------------------------- */
    var leftArrow = '<i class="la la-arrow-left"></i>';
    var rightArrow = '<i class="la la-arrow-right"></i>';
    var leftAngle = '<i class="la la-angle-left"></i>';
    var rightAngle = '<i class="la la-angle-right"></i>';

    function sliders() {
      /*------------------------------------------------
                banner-slider
            ------------------------------------------------*/
      $(".banner-slider").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        smartSpeed: 1500,
        items: 1,
        navText: [leftAngle, rightAngle],
      });

      /*------------------------------------------------
                envestor-slider
            ------------------------------------------------*/
      $(".envestor-slider").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        smartSpeed: 1500,
        items: 4,
        navText: [leftAngle, rightAngle],
        responsive: {
          0: {
            items: 1,
          },
          480: {
            items: 2,
          },
          768: {
            items: 3,
          },
        },
      });

      /*------------------------------------------------
                partner-slider
            ------------------------------------------------*/
      $(".partner-slider").owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        smartSpeed: 1500,
        items: 4,
        responsive: {
          0: {
            items: 1,
          },
          575: {
            items: 2,
          },
          768: {
            items: 3,
          },
          992: {
            items: 4,
          },
        },
      });
    }
    sliders();

    /*------------------------------------------------
            Magnific JS
        ------------------------------------------------*/
    $(".play-btn").magnificPopup({
      type: "iframe",
      removalDelay: 260,
      mainClass: "mfp-zoom-in",
    });
    $.extend(true, $.magnificPopup.defaults, {
      iframe: {
        patterns: {
          youtube: {
            index: "youtube.com/",
            id: "v=",
            src: "https://www.youtube.com/embed/Wimkqo8gDZ0",
          },
        },
      },
    });
    /* -------------------------------------------------------------
         fact counter
         ------------------------------------------------------------- */
    $(".counter").counterUp({
      delay: 15,
      time: 2000,
    });

    /*------------------
           back to top
        ------------------*/
    $("body").delegate(".back-to-top", "click", function (e) {
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        2000
      );
    });

    /*------------------
           few modifications for react
        ------------------*/

    $("body").delegate(".initiate-scripts", "click", function () {
      setTimeout(() => {
        sliders();
        $(".counter").counterUp({
          delay: 15,
          time: 2000,
        });
        $("select").niceSelect();
      }, 100);
    });
  });

  $(window).on("scroll", function () {
    /*---------------------------------------
        sticky menu activation && Sticky Icon Bar
        -----------------------------------------*/
    var mainMenuTop = $(".navbar-area");
    if ($(window).scrollTop() >= 1) {
      mainMenuTop.addClass("navbar-area-fixed");
    } else {
      mainMenuTop.removeClass("navbar-area-fixed");
    }

    var ScrollTop = $(".back-to-top");
    if ($(window).scrollTop() > 1000) {
      ScrollTop.fadeIn(1000);
    } else {
      ScrollTop.fadeOut(1000);
    }
  });

  $(window).on("load", function () {
    /*-----------------
            preloader
        ------------------*/
    var preLoder = $("#preloader");
    preLoder.fadeOut(0);

    /*-----------------
            back to top
        ------------------*/
    var backtoTop = $(".back-to-top");
    backtoTop.fadeOut();

    /*---------------------
            Cancel Preloader
        ----------------------*/
    $("body").delegate(".cancel-preloader a", "click", function (e) {
      e.preventDefault();
      $("#preloader").fadeOut(2000);
    });

    // account form animations
    $("body").delegate("#account", "click", function (e) {
      $("#accountForm").fadeToggle();
    });
    $(document).mouseup(function (e) {
      var container = $("#accountForm");

      if (
        !container.is(e.target) && // if the target of the click isn't the container...
        container.has(e.target).length === 0
      ) {
        // ... nor a descendant of the container
        container.fadeOut();
      }
    });
  });
})(jQuery);
