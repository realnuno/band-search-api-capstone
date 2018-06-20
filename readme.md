# Band-search
Thinkful (https://www.thinkful.com/) API portfolio project - a responsive app to easily find upcoming shows and directions to your favorite bands.

![Opening Page Screenshot](https://github.com/LeahBorns/upbeat-atlas-artist-finder-songkick-api-capstone/blob/master/github-images/opening-page-screen-shot.png)
???

## Introduction
Finding upcoming shows is as easy as a click of a search button but getting to a show can be a nightmare. Not only is parking impossible but it puts so many cars on the road and increases carbon emissions. With Upbeat Atlas I wanted to create an easy way for event goers to locate their next show with a Google map to easily find directions along with a gentle nudge to consider taking a more sustainable way.


## Use Case
Why is this app useful? Event site is loaded with information: venue location etc. To get directions it requires copying and pasting the venue address or remembering the venue name to input into Google Maps. Band-search simplifies that by just providing the venue name, date, and a pinpoint map to get directions. No more searching around for directions when getting those last minute directions.

## UX

Initial wireframes for Band-search can be seen below. Wireframes of all key processes were designed along with data flow and user questions for key tasks.

![Initial Wireframes](https://github.com/LeahBorns/upbeat-atlas-artist-finder-songkick-api-capstone/blob/master/github-images/user-flow-wire-frame-thinkful.jpg)

The app is responsive and was designed to work on mobile, tablet and desktop screens. A friendly popup window appears as users search for artists as information loads to consider choosing a more sustainable travel option.

## Live Site
You can access Band-search at https://realnuno.github.io/band-search-api-capstone/

## Technical
* The app is built using HTML5, CSS3 and JS 5 and 6.
* The app is fully responsive, adapting for mobile, table and desktop viewports.
??? * The app is interactive with animation and a popup window upon clicking the Upbeat Atlas logo and search button respectively.
??? site address needs to be changed. * API's have been aquired from Songkick (http://www.songkick.com/developer/upcoming-events-for-artist) to get the JSON response to provide information on upcoming shows.
*Google Maps (https://developers.google.com/maps/documentation/embed/guide) required an Embeded API to provide an interactive map with an HTTP request.
* Using the JSON response from Bandsintown, HTML was populated for each search result.
