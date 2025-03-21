/*!
 *
 * Version:     1.8.0
 * Author:      Gianluca Guarini
 * Contact:     gianluca.guarini@gmail.com
 * Website:     http://www.gianlucaguarini.com/
 * Twitter:     @gianlucaguarini
 *
 * Copyright (c) Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/
/*global console*/
(function($) {

  'use strict';

  $.html5Loader = function(customOptions) {
    var defaults = {
        filesToLoad: null,
        /* set the path to the JSON or pass an object containing the files to preload */
        debugMode: false,
        /**
         * do not execute the javascript files when they'll be preloaded
         * this option could be overridden into the json per each javascript file
         * @type {Boolean}
         */
        stopExecution: false,
        /**
         * decide the the buffer size before considering the media preloaded
         * by default it's the 20% of the entire size of the media file
         * Pay attention, many browsers cannot preload the entire media files, they just buffer luckily the half (or less) of them
         * more info: http://www.stevesouders.com/blog/2013/04/12/html5-video-preload/
         * @type {Float}
         */
        mediaBufferSizeToPreload: 0.2,
        /* let the browser decide when the media file has been buffered enough to be played by listening the canplaythrough event */
        forceMediaPreload: true,
        /* script files won't execute when loaded */
        onBeforeLoad: function() {},
        /* this functions is triggered before the preloader starts loading the sources */
        onComplete: function() {},
        /* set the onComplete is triggered when everything is loaded */
        onElementLoaded: function(obj, elm) {},
        /* this Callback is triggered anytime an object is loaded */
        onUpdate: function(percentage) {},
        /* this function returns alway the current percentage */
        onMediaError: function(obj, elm) {} /* This function is invoked in case of any error occurred during the media element fetch*/
      },
      // merging the custom options with the default ones
      options = $.extend(defaults, customOptions);

    /*
     *
     * PUBLIC VAR
     * Configuration
     *
     */
    var filesToLoad = options.filesToLoad,
      debugMode = options.debugMode,
      mediaBufferSizeToPreload = options.mediaBufferSizeToPreload,
      forceMediaPreload = options.forceMediaPreload,
      stopExecution = options.stopExecution,
      onBeforeLoad = options.onBeforeLoad,
      onComplete = options.onComplete,
      onElementLoaded = options.onElementLoaded,
      onUpdate = options.onUpdate,
      onMediaError = options.onMediaError;

    /*
     *
     * PRIVATE VARS
     *
     */
    var $head = $('head'),
      _currentSegment = 0,
      _bytesLoaded = 0,
      _bytesTotal = 0,
      _files = [],
      _isTablet = navigator.userAgent.match(/iPad|Android|(?=.*\bWindows\b)(?=.*\bARM\b)/i),
      _isMobile = (function(a) {
        if (/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) return true;
        else return false;
      })(navigator.userAgent || navigator.vendor || window.opera),
      _support = {};
    /*
     *
     * PRIVATE METHODS
     *
     */


    /*
     *
     * @description Used to debug the application
     * @param msg: {string, object, function, array} anything we need to log in the console
     *
     */

    var log = function(msg) {
      if (debugMode && console) {
       // console.log(msg);
      }
    };

    /*
     *
     * @description Check the support for HTML5 video and audio tags
     * @link http://modernizr.com/
     *
     */

    _support.video = function() {
      /* jshint -W053 */
      var elem = document.createElement('video'),
        bool = false;

      // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
      try {
        if (!!elem.canPlayType) {
          bool = {
            ogg: elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ''),
            // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
            h264: elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ''),
            webm: elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ''),
            vp9: elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, '')
          };
          // backward compatibility
          bool.mp4 = bool.h264;
        }
      } catch (e) {}

      return bool;
    }();

    _support.audio = function() {
      /* jshint -W053 */
      var elem = document.createElement('audio');
      var bool = false;

      try {
        if (!!elem.canPlayType) {
          bool = {
            ogg: elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
            mp3: elem.canPlayType('audio/mpeg;').replace(/^no$/, ''),
            opus: elem.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
            // Mimetypes accepted:
            // developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
            // bit.ly/iphoneoscodecs
            wav: elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
            m4a: (elem.canPlayType('audio/x-m4a;') ||
              elem.canPlayType('audio/aac;')).replace(/^no$/, '')
          };

        }
      } catch (e) {}

      return bool;
    }();

    /**
     *
     * Check the svg support
     *
     */

    _support.svg = function() {
      return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
    }();

    /*
     *
     * @description Loops on the available source files to find the right one to preload
     * @param file: {object} the node that we need to parse to check the source supported
     *
     */

    var findSupportedSource = function(file) {
      var type = file.type.toLowerCase(),
        sources = file.sources;

      $.each(sources, function(tmpSource) {
        if (_support[type][tmpSource]) {
          file = file.sources[tmpSource];
          file.type = type.toUpperCase();
          return false;
        }
      });
      if (file.source) {
        return file;
      } else {
        return false;
      }
    };

    /*
     *
     * @description Output the current percentage using the onUpdate function passed as parameter to the loader
     *
     */
	  var pixels=0;
	  var loadingComplete=false;
	function move(aTmpPerc) {
	  var elem = $(".mainprogress > .progressDiv");   
	  var id = setInterval(frame, 1);
	  var parentWidth=$(".mainprogress").width(); 
	  var previousWidth=0;
	  function frame() {
		if (width >= aTmpPerc) {
			clearInterval(id);
			fnPageLoaded(width);
		} else {
			if(!loadingComplete)
			{
				$(".mainprogress > .progressDiv").width(previousWidth);
			}
			width++; 
			pixels = parentWidth*(width/100)
			if(pixels>=previousWidth)
			{
				$(".mainprogress > .progressDiv").width(pixels);
				previousWidth= $(".mainprogress > .progressDiv").width();
				$(".mainprogress > .main_percent").html(width+ " %");
			}
		}
	  }
	}
	function fnPageLoaded(aWidth)
	{
		if(aWidth==100)
		{

			loadingComplete=true;
			setTimeout(function(){
				$(".mejs-overlay-loading").css("opacity","1");
				$(".preloader, .preloaderBg").hide();
				if(device.iOS() && !firstIconLoad)
				{
					if(pageTypeArray[currModule-1][currPageNum-1]=="2d_ani" || pageTypeArray[currModule-1][currPageNum-1]=="steplist" || pageTypeArray[currModule-1][currPageNum-1]=="obj" || pageTypeArray[currModule-1][currPageNum-1]=="int_pop" || pageTypeArray[currModule-1][currPageNum-1]=="clk_qk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_spot" || pageTypeArray[currModule-1][currPageNum-1]=="chart_clk" || pageTypeArray[currModule-1][currPageNum-1]=="txtImg")
					{
						if(device.MobileDevice()){
							$(".ipad_play").hide();
							$(".playButton").hide();
						}
						else{
						if(bookmarkVisit == true){
							$(".ipad_play").hide();
							$(".playButton").hide();
							}
							else {
							if(device.iPad()){
							$(".ipad_play").show();
							$(".playButton").show();
							}
							else {
							$(".ipad_play").hide();
							$(".playButton").hide();
							}
							}
							
						}		
						firstIconLoad=true;
					}else{
						$(".ipad_play").hide();
					}
				}else if(device.Android() && !firstIconLoad)
				{
					if(pageTypeArray[currModule-1][currPageNum-1]=="2d_ani" || pageTypeArray[currModule-1][currPageNum-1]=="steplist" || pageTypeArray[currModule-1][currPageNum-1]=="obj" || pageTypeArray[currModule-1][currPageNum-1]=="int_pop" || pageTypeArray[currModule-1][currPageNum-1]=="clk_qk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_spot" || pageTypeArray[currModule-1][currPageNum-1]=="chart_clk" || pageTypeArray[currModule-1][currPageNum-1]=="txtImg")
					{
						if(device.MobileDevice()){
							$(".ipad_play").hide();
							$(".playButton").hide();
						}
						else{
							$(".ipad_play").show();
							$(".playButton").show();
						}		
						firstIconLoad=true;
					}else{
						$(".ipad_play").hide();
					}
				}else{
					$(".playButton").hide();
				}
			if(pageType=="main")
			{
				if(pageTypeArray[currModule-1][currPageNum-1]=="2d_ani" || pageTypeArray[currModule-1][currPageNum-1]=="steplist" || pageTypeArray[currModule-1][currPageNum-1]=="obj" || pageTypeArray[currModule-1][currPageNum-1]=="txtImg" )
				{
						
					if(audioPlayer){
						audioPlayer.pause();
					}
					if($("#page").find('#processAlertContainer').length == 1) {
						videoPlayer.pause();
						$("#page").find('#processAlertContainer').show();
						/* $(".right_btns, .pc_dy, .modulecontinue_clkbtn, .steplistBar, .mob_dy, #revTool, .logout_clkbtn").css('pointer-events', 'none') */
					} else {
					/* $(".right_btns, .pc_dy, .modulecontinue_clkbtn, .steplistBar, .mob_dy, #revTool, .logout_clkbtn").css('pointer-events', 'auto') */
						setTimeout(function(){
							videoPlayer.play();
						},50);
					}
					
					 
				}else if(pageTypeArray[currModule-1][currPageNum-1]=="int_pop" || pageTypeArray[currModule-1][currPageNum-1]=="chart_clk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_qk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_spot" || pageTypeArray[currModule-1][currPageNum-1]=="clk_rvl")
				{
				$(".right_btns, .pc_dy, .modulecontinue_clkbtn, .steplistBar, .mob_dy, #revTool, .logout_clkbtn").css('pointer-events', 'auto')
					if(videoPlayer){
						videoPlayer.pause();
					}
					
					if(visitedAudio && backBtnClicked)
					{
						audioPlayer.pause();
					}else{
						setTimeout(function(){
							audioPlayer.play();
						},100)
					}
				}else {
					if(audioPlayer){
						audioPlayer.pause();
					}
					if(videoPlayer){
						videoPlayer.pause();
					}
				}
			}else{
				if(subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="2d_ani" || subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="steplist" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="obj" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="txtImg")
				{
					audioPlayer.pause();
					videoPlayer.play();
					
				}else if(subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="int_pop" || pageTypeArray[currModule-1][currPageNum-1]=="chart_clk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_qk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_spot" || pageTypeArray[currModule-1][currPageNum-1]=="clk_rvl")
				{
					videoPlayer.pause();
					audioPlayer.play();
				}else {
					audioPlayer.pause();
					videoPlayer.pause();
				}
			}
		  },100);
	  }
	}
	var width = 1;
    var updatePercentage = function() {
      var currPercentage = 0;
	  var currwidth=0
	  width = 1;
      currPercentage = Math.round((_bytesLoaded / _bytesTotal) * 100);
	  currwidth = Math.round((_bytesLoaded / _bytesTotal));
	  var tmpwidth=currwidth * $(".mainprogress").width();
	  move(currPercentage)
	  $(".main_percent").hide()
    };

    /*
     *
     * @description Populate the _files array increasing the _bytesTotal var
     * @param index: file index
     * @param obj: the json node representing the file properties
     *
     */

    var arrangeData = function(segmentIndex, index, obj) {
      var file = obj;

      if (file.type === 'VIDEO' || file.type === 'AUDIO') {
        file = findSupportedSource(file);
      }

      if (file) {
        _bytesTotal += file.size;
        _files[segmentIndex].push(file);
      }
    };

    /*
     *
     * @description Deal with data received from the json loaded
     * @param data: object
     *
     */

    var onJsonLoaded = function(data) {
      var segment;
      if (!data.files[0].length) {
        data.files = [data.files];
      }
      for (var i = 0, l = data.files.length; i < l; i++) {
        _files.push([]);
        segment = data.files[i];
		arrangeData(i, callPageNumber, segment[callPageNumber]);
      }
    };

    /*
     *
     * @description Load any kind of image
     * @param file: object
     *
     */

    var loadImage = function(file) {
      var defer = new $.Deferred(),
        size = file.size,
        $image = $('<img>'),
        onImageLoaded = function() {

          log('File Loaded:' + src);
          _bytesLoaded += size;
          onElementLoaded(file, this);
          // removing the file from the array
          _files[_currentSegment].splice(0, 1);
          updatePercentage();
          defer.resolve();

        },
        src;

      // load the svg or the fallback image
      if (file.source.toString() === '[object Object]') {
        if (file.source.svg && _support.svg) {
          src = file.source.svg;
        } else if (file.source.fallback) {
          src = file.source.fallback;
        }
      } else {
        src = file.source;
      }

      $image.on('load', onImageLoaded);
      $image.attr('src', src);

      // preventing a memory leak
      $image = null;

      return defer.promise();
    };

    /*
     *
     * @description Load video or audio files
     * @param file: object
     *
     */

    var loadMedia = function(file) {

      var defer = new $.Deferred(),
        size = file.size,
        $media = file.type === 'VIDEO' ? $('<video>') : $('<audio>'),
        onMediaLoaded = function() {

          _bytesLoaded += size;

          onElementLoaded(file, $media[0]);

          _files[_currentSegment].splice(0, 1);

          $media.off();
          $media = null;

          updatePercentage();
          defer.resolve();
        };

      // if it is a mobile or an iPad we avoid the media preloading
      if (!_isMobile && !_isTablet) {

        $media.on('loadstart', function() {
          if (this.networkState === 3) {
            onMediaError(file, this);
            onMediaLoaded();
          }
        });

        $media.on('error stalled', function() {
          onMediaError(file, this);
          onMediaLoaded();
        });

        // on Media Progress
        $media.on('loadedmetadata', function() {
          $media.on('progress', function() {
            var bytesTmpLoaded = 0;
            log('loading in progress file:' + file.source);
            if (this.buffered.length > 0) {
              bytesTmpLoaded = (size / this.duration) * this.buffered.end(0);
              size -= bytesTmpLoaded;
              _bytesLoaded += bytesTmpLoaded;
              updatePercentage();
              // Check if the video has been buffered enough to be considered preloaded
              if (1 / size * bytesTmpLoaded > mediaBufferSizeToPreload && !forceMediaPreload)
                onMediaLoaded();
            }
          });
        });

        $media.attr({
          preload: 'auto',
          src: file.source,
          controls: 'controls'
        });

        // let the browser decide when the media file has been buffered enough
        // to be played
        if (forceMediaPreload)
          $media.on('canplaythrough', onMediaLoaded);

      } else {
        //  that means that media is loaded by default
        onMediaLoaded();
      }


      return defer.promise();
    };

    /*
     *
     * @description Load scripts making them available to the DOM
     * @param file: object
     *
     */

    var loadScript = function(file) {
      var defer = new $.Deferred(),
        size = file.size,
        args = {
          url: file.source,
          dataType: 'script'
        };

      // Disables script execution when loaded upon users request.
      if ((typeof file.stopExecution === 'undefined' && stopExecution) || file.stopExecution === true)
        args.converters = {
          'text script': function(text) {
            return text;
          }
        };


      $.ajax(args).done(function(data) {

        log('File Loaded:' + file.source);

        _bytesLoaded += size;

        onElementLoaded(file, data);

        // removing the file from the array
        _files[_currentSegment].splice(0, 1);
        updatePercentage();
        defer.resolve();
      })
        .fail(function(jqxhr, settings, exception) {
          log('\n File Failed: ' + file.source +
            '\n Message:     ' + exception.message + '\n');
        });

      return defer.promise();
    };

    /*
     *
     * @description Load any text file or CSS and applying it to current page
     * @param file: object
     * @param { Boolean } isCss: if it's true i will append the css into the head tag of the page
     *
     */

    var loadText = function(file, isCss) {
      var defer = new $.Deferred();
      $.ajax({
        url: file.source,
        dataType: 'text',
        success: function(data) {
          log('File Loaded:' + file.source);
          onElementLoaded(file, data);
          _bytesLoaded += file.size;
          _files[_currentSegment].splice(0, 1);
          updatePercentage();
          // IE8/7 fix
          // http://stackoverflow.com/questions/805384/how-to-apply-inline-and-or-external-css-loaded-dynamically-with-jquery
          if (isCss)
            if (document.createStyleSheet) {
              try {
                document.createStyleSheet(file.source);
              } catch (e) {}
            } else {
              var css;
              css = document.createElement('link');
              css.rel = 'stylesheet';
              css.type = 'text/css';
              css.media = 'all';
              css.href = file.source;
              $head[0].appendChild(css);
            }

          defer.resolve(data);
        }
      });

      return defer.promise();
    };

    /*
     *
     * @description start loading all the files
     *
     */

    var startLoading = function() {

      var filesArray = _files[_currentSegment].slice();

      $.each(filesArray, function(i, file) {

        log('preloading files');

        log('file to preload:' + file.source);
        switch (file.type) {
          case 'IMAGE':
            loadImage(file);
            break;
          case 'VIDEO':
          case 'AUDIO':
            loadMedia(file);
            break;
          case 'SCRIPT':
            loadScript(file);
            break;
          case 'TEXT':
          case 'CSS':
            loadText(file, /CSS/g.test(file.type));
            break;
          default:
            return false;
        }

      });

    };

    /*
     *
     * PUBLIC METHODS
     *
     */

    /*
     *
     * Start preloading the page
     *
     */

    this.init = function() {
   //  console.log('plugin initialized');

      var defer = new $.Deferred(),
        promise = defer.promise();
      onBeforeLoad();
      if (typeof filesToLoad === 'object') {
        $.proxy(onJsonLoaded, this, filesToLoad)();
        defer.resolve(filesToLoad);
      } else {
        $.getJSON(filesToLoad, defer.resolve);
        // once the json has been loaded parse all data received
        defer.pipe($.proxy(onJsonLoaded, this));
      }
      // ready to preload all the files
      promise.then($.proxy(updatePercentage, this));
      promise.then($.proxy(startLoading, this));

    };

    this.init();

    return this;

  };

})(jQuery);