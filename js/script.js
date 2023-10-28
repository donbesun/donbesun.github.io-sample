/* スクロールスライダー -------------------------------*/
$(function () {
  $('.slider1').slick({
    // 無限スクロールにする（最後の画像の次は最初の画像を表示）
    infinite: true,
    // スライドのエリアに表示する画像の数
    slidesToShow: 2.6,
    // 一度にスライドする数
    slidesToScroll: 1,
    // 自動再生する
    autoplay: true,
    // 自動再生の切替え時間（ミリ秒）
    autoplaySpeed: 0,
    cssEase: 'linear',
    speed: 5000,
    // 画像下のドット（ページ送り）を表示
    dots: false,
    // レスポンシブ対応
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
  $('.slider2').slick({
    // 無限スクロールにする（最後の画像の次は最初の画像を表示）
    infinite: true,
    // スライドのエリアに表示する画像の数
    slidesToShow: 2.6,
    // 一度にスライドする数
    slidesToScroll: 1,
    // 自動再生する
    autoplay: true,
    // 自動再生の切替え時間（ミリ秒）
    autoplaySpeed: 0,
    cssEase: 'linear',
    speed: 5000,
    //スライダーを左から右に流す（逆向き）
    rtl: true,
    // 画像下のドット（ページ送り）を表示
    dots: false,
    // レスポンシブ対応
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
});
/* endスクロールスライダー -------------------------------*/

/* カウントアップ -------------------------------*/
$(function () {
  $(window).on('load scroll', function () {
    $('.js-count').each(function () {
      var txtPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > txtPos - windowHeight + windowHeight / 5) {
        if ($('.js-num', this).attr('data-num').indexOf('.') > -1) {
          var rounding = 1;
        } else {
          var rounding = 0;
        }
        $('.js-num', this).numerator({
          easing: 'linear', //カウントアップの動き
          duration: 1000, //カウントアップの時間
          toValue: $('.js-num', this).attr('data-num'), //カウントアップする数値
          rounding: rounding, //小数点以下の桁数（初期値：0）
        });
      }
    });
  });
});
/*
 *   jQuery Numerator Plugin 0.2.1
 *   https://github.com/garethdn/jquery-numerator
 *
 *   Copyright 2015, Gareth Nolan
 *   http://ie.linkedin.com/in/garethnolan/

 *   Based on jQuery Boilerplate by Zeno Rocha with the help of Addy Osmani
 *   http://jqueryboilerplate.com
 *
 *   Licensed under the MIT license:
 *   http://www.opensource.org/licenses/MIT
 */

(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD is used - Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    // Neither AMD nor CommonJS used. Use global variables.
    if (typeof jQuery === 'undefined') {
      throw 'jquery-numerator requires jQuery to be loaded first';
    }
    factory(jQuery);
  }
})(function ($) {
  var pluginName = 'numerator',
    defaults = {
      easing: 'swing',
      duration: 500,
      delimiter: undefined,
      rounding: 0,
      toValue: undefined,
      fromValue: undefined,
      queue: false,
      onStart: function () {},
      onStep: function () {},
      onProgress: function () {},
      onComplete: function () {},
    };

  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      this.parseElement();
      this.setValue();
    },

    parseElement: function () {
      var elText = $.trim($(this.element).text());

      this.settings.fromValue = this.settings.fromValue || this.format(elText);
    },

    setValue: function () {
      var self = this;

      $({ value: self.settings.fromValue }).animate(
        { value: self.settings.toValue },
        {
          duration: parseInt(self.settings.duration, 10),

          easing: self.settings.easing,

          start: self.settings.onStart,

          step: function (now, fx) {
            $(self.element).text(self.format(now));
            // accepts two params - (now, fx)
            self.settings.onStep(now, fx);
          },

          // accepts three params - (animation object, progress ratio, time remaining(ms))
          progress: self.settings.onProgress,

          complete: self.settings.onComplete,
        }
      );
    },

    format: function (value) {
      var self = this;

      if (parseInt(this.settings.rounding) < 1) {
        value = parseInt(value, 10);
      } else {
        value = parseFloat(value).toFixed(parseInt(this.settings.rounding));
      }

      if (self.settings.delimiter) {
        return this.delimit(value);
      } else {
        return value;
      }
    },

    // TODO: Add comments to this function
    delimit: function (value) {
      var self = this;

      value = value.toString();

      if (self.settings.rounding && parseInt(self.settings.rounding, 10) > 0) {
        var decimals = value.substring(value.length - (self.settings.rounding + 1), value.length),
          wholeValue = value.substring(0, value.length - (self.settings.rounding + 1));

        return self.addDelimiter(wholeValue) + decimals;
      } else {
        return self.addDelimiter(value);
      }
    },

    addDelimiter: function (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.settings.delimiter);
    },
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if ($.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, null);
      }
      $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
    });
  };
});
// // 画面内に入ったらcountをクラスに追加
// var boxes = document.querySelectorAll('.counted');
// var boxesArray = Array.prototype.slice.call(boxes, 0);
// var options = {
//   root: null,
//   rootMargin: '0px 50%',
//   threshold: 0,
// };
// var observer = new IntersectionObserver(doWhenIntersect, options);
// boxesArray.forEach(function (box) {
//   observer.observe(box);
// });

// function doWhenIntersect(entries) {
//   var entriesArray = Array.prototype.slice.call(entries, 0);
//   entriesArray.forEach(function (entry) {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('count');
//     }
//   });
//   // 数時間とアップ
//   $(function () {
//     var countElm = $('.count'),
//       countSpeed = 15;

//     countElm.each(function () {
//       var self = $(this),
//         countMax = self.attr('data-num'),
//         thisCount = self.text(),
//         countTimer;

//       function timer() {
//         countTimer = setInterval(function () {
//           var countNext = thisCount++;
//           self.text(countNext);

//           if (countNext == countMax) {
//             clearInterval(countTimer);
//           }
//         }, countSpeed);
//       }
//       timer();
//     });
//   });
// }
// /* endカウントアップ -------------------------------*/

$(function () {
  $(window).scroll(function () {
    const windowHeight = $(window).height();
    const scroll = $(window).scrollTop();

    $('.element').each(function () {
      const targetPosition = $(this).offset().top;
      if (scroll > targetPosition - windowHeight + 50) {
        $(this).addClass('is-fadein');
      }
    });
  });
});

// ローディング---------------------------------
//読み込みが完了したら実行
$(window).on('load', function () {
  // ローディングが10秒以内で終わる場合、読み込み完了後ローディング非表示
  endLoading();
});

//10秒経過した段階で、上記の処理を上書き、強制終了
setTimeout('endLoading()', 10000);

//ローディング非表示処理
function endLoading() {
  // 4秒かけてロゴを非表示にし、その後0.8秒かけて背景を非表示にする
  $('.js-loading').fadeOut(2000, function () {
    $('.js-loading').fadeOut(400);
  });
}

// インタビュー画像動き--------------------------
// スクロールで要素をフェードインさせる（jQueryプラグイン inview.jsを利用）
$(function () {
  $('.items').on('inview', function (event, isInview) {
    if (isInview) {
      $(this).stop().addClass('scrollin');
    }
  });
});

// インフォグラフィックの画像とフローの下からの動き
$(function () {
  $('.flowmove').on('inview', function (event, isInview) {
    if (isInview) {
      $(this).stop().addClass('scrollin');
    }
  });
});

// キャチコピー動き
$(function () {
  $('.draw').addClass('-do'); //Don't do animations until the page is ready to do them smoothly
});
