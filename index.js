$(document).ready(function () {




    let userSearch;

    $("input").keydown(function (e) {
        e.stopPropagation();
        if (e.keyCode === 13) {
            e.preventDefault();

            userSearch = $("input").val();
            $("input").val("");

            getPhotoResult(userSearch, displayPhotoData);

            getYoutubeResult(userSearch, displayYoutubeData)

            getConcertInfo(userSearch, displayConcertInfo);


            $('html, body').animate({
                scrollTop: $('.js--results').offset().top
            }, 1000);
        };
    });





    /******************Youtube Data*************************/


    function getYoutubeResult(userInput, callback) {

        const settings = {
            url: "https://www.googleapis.com/youtube/v3/search",
            data: {
                part: "snippet",
                maxResults: 25,
                type: "video",
                videoEmbeddable: "true",
                key: "AIzaSyDxkmLJ32YwnuN4b7vuHfxpGrbZ99edrbE",
                q: userInput
            },
            type: "GET",
            dataType: "json",
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        };

        $.ajax(settings);

    };

    function displayYoutubeData(data) {

        const videoUrl = `https://www.youtube.com/watch?v=${data.items[5].id.videoId}`
        const thumbnailUrl = data.items[5].snippet.thumbnails.high.url

        //        console.log(thumbnailUrl);

        $(".popup-youtube").attr("href", videoUrl);
        $(".thumbnail").attr("src", thumbnailUrl);
    }





    /******************Photo Data*************************/


    function getPhotoResult(userInput, callback) {


        const settings = {
            url: `https://rest.bandsintown.com/artists/${userInput}?app_id=bfbda5c7d01ac156661c3c54a7a5957f`,
            data: {
                part: "snippet"
            },
            type: "GET",
            dataType: "json",
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        };

        $.ajax(settings);
    }

    function displayPhotoData(data) {

        //        console.log(data.image_url);

        const imgUrl = data.image_url;

        $(".band-picture img").attr("src", imgUrl);
    }








    /******************Event Time & Venue Data*************************/


    function getConcertInfo(userInput, callback) {

        const settings = {
            url: `https://rest.bandsintown.com/artists/${userInput}/events?app_id=bfbda5c7d01ac156661c3c54a7a5957f`,
            data: {
                part: "snippet"
            },
            type: "GET",
            dataType: "json",
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        };

        $.ajax(settings);

    }




    function displayConcertInfo(data) {



        const eventTime = data[0].datetime;
        const eventCity = data[0].venue.city;
        const eventVenue = data[0].venue.name;
        const eventRegion = data[0].venue.region;

        $(".when").text(eventTime);
        $(".venue-name").html(`${eventCity}, ${eventRegion}<br/>${eventVenue}`);

        const map = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBdNRsY4zEYnRfcQ0_ZVVd370D7yuApzhI&q=${eventVenue},${eventCity}"&maptype=roadmap`;

        console.log(map);

        $(".popup-gmaps").attr("href", map);
    }









    /****************POPUP ANIMATE*******************/


    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });


    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        }
    });


    //    $(window).resize(function () { //checking for window resize event
    //
    //        if ($(window).width() < 414) { //checking for window width
    //            if ($("input").is(":focus")) {
    //                $('.content').css({
    //                    'margin-top': -15 + 'px'
    //                });
    //                $('.footer').css({
    //                    'margin-bottom': -100 + 'px'
    //                });
    //            }
    //        }
    //    });

});






/****************INPUT ANIMATE*******************/


var input;
var cursor;
var hiddenInput;
var content = [];
var lastContent = "",
    targetContent = "";
var inputLock = false;
var autoWriteTimer;

var isMobile, isIE;

window.onload = function () {

    isMobile = navigator && navigator.platform && navigator.platform.match(/^(iPad|iPod|iPhone)$/);

    isIE = (navigator.appName == 'Microsoft Internet Explorer');

    input = document.getElementById('input');

    hiddenInput = document.getElementById('hiddenInput');
    hiddenInput.focus();

    cursor = document.createElement('cursor');
    cursor.setAttribute('class', 'blink');
    cursor.innerHTML = "|";

    if (!isMobile && !isIE) input.appendChild(cursor);

    function refresh() {

        inputLock = true;

        if (targetContent.length - lastContent.length == 0) return;

        var v = targetContent.substring(0, lastContent.length + 1);

        content = [];

        var blinkPadding = false;

        for (var i = 0; i < v.length; i++) {
            var l = v.charAt(i);

            var d = document.createElement('div');
            d.setAttribute('class', 'letterContainer');

            var d2 = document.createElement('div');

            var animClass = (i % 2 == 0) ? 'letterAnimTop' : 'letterAnimBottom';

            var letterClass = (lastContent.charAt(i) == l) ? 'letterStatic' : animClass;

            if (letterClass != 'letterStatic') blinkPadding = true;

            d2.setAttribute('class', letterClass);

            d.appendChild(d2);

            d2.innerHTML = l;
            content.push(d);
        }

        input.innerHTML = '';

        for (var i = 0; i < content.length; i++) {
            input.appendChild(content[i]);
        }

        cursor.style.paddingLeft = (blinkPadding) ? '22px' : '0';

        if (!isMobile && !isIE) input.appendChild(cursor);

        if (targetContent.length - lastContent.length > 1) setTimeout(refresh, 150);
        else inputLock = false;

        lastContent = v;
    }

    if (document.addEventListener) {

        document.addEventListener('touchstart', function (e) {
            clearInterval(autoWriteTimer);
            targetContent = lastContent;
        }, false);

        document.addEventListener('click', function (e) {
            clearInterval(autoWriteTimer);
            targetContent = lastContent;
            hiddenInput.focus();
        }, false);

        if (!isIE) {
            // Input event is buggy on IE, so don't bother
            // (https://msdn.microsoft.com/en-us/library/gg592978(v=vs.85).aspx#feedback)
            // We will use a timer instead (below)
            hiddenInput.addEventListener('input', function (e) {
                e.preventDefault();
                targetContent = hiddenInput.value;
                if (!inputLock) refresh();

            }, false);
        } else {
            setInterval(function () {
                targetContent = hiddenInput.value;

                if (targetContent != lastContent && !inputLock) refresh();
            }, 100);
        }

    }

    hiddenInput.value = "";

    autoWriteTimer = setTimeout(function () {
        if (lastContent != "") return;
        targetContent = "search here...";
        refresh();
    }, 300);
}
