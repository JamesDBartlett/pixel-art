$(function () {
    var key = 'KlN2nGZbuMg9uOy1AIbmIx7b3oAaClQSe3VJHQNA';
    var $section1 = $('body');
    var nextImage = $('#newbg');

    function insertNewBackground() {

        function random(min, max) {
            return result = Math.floor(Math.random() * (max - min + 1)) + min; // create random year, day, and month
        }

        var year = random(2005, 2018);
        var month = random(1, 12);
        var day = random(1, 28);

        var date = year + '-' + month + '-' + day;
        var url = 'https://api.nasa.gov/planetary/apod?api_key=' + key + '&date=' + date; // add random date to url

        $.ajax({
            url: url
        }).done(function (response) {
            var background = response.url;
            nextImage.fadeIn(5000);
            $section1.fadeIn(5000).css('background-image', 'url(' + background + ')');
        }).fail(function (error) {
            console.log(error);
        });
    }

    insertNewBackground();

    nextImage.on('click', function () {
        insertNewBackground();
    });
});
