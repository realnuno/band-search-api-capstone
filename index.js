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

        const videoUrl = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`
        const thumbnailUrl = data.items[0].snippet.thumbnails.high.url


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

});
