$(function () {
    var key = 'KlN2nGZbuMg9uOy1AIbmIx7b3oAaClQSe3VJHQNA';
    var $section1 = $('#background-image');
    var imageInformation = $('.image-information');
    var imageDate = $('.image-date');
    var nextImage = $('.show-next-image');
    var mainContent = $('main');

    function insertNewBackground() {
        mainContent.addClass('hidden');

        function random(min, max) {
            return result = Math.floor(Math.random() * (max - min + 1)) + min; // create random year, day, and month
        }

        var year = random(2005, 2018);
        var month = random(1, 12);
        var day = random(1, 28);

        var date = year + '-' + month + '-' + day;
        var url = 'https://api.nasa.gov/planetary/apod?api_key=' + key + '&date=' + date + '&hd=true'; // add random date to url

        $.ajax({
            url: url
        }).done(function (response) {
            var background = response.hdurl;
            nextImage.fadeIn(5000);
            $section1.fadeIn(5000).css('background-image', 'url(' + background + ')');
            var title = response.title;
            var date = response.date;
            imageInformation.text(title);
            imageDate.text('Taken: ' + date);
            mainContent.delay(3000).fadeIn(6000);
        }).fail(function (error) {
            console.log(error);
        });
    }

    insertNewBackground();

    nextImage.on('click', function () {
        $(this).fadeOut(1000);
        insertNewBackground();
    });
});
