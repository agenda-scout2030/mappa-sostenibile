$(window).load(function () {
    const popup = $('.popupBackground')

    // show on startup
    popup.show()

    // open popup when info image is clicked
    $(".infoButton").click(function(){
        $('.popupBackground').show();
    });

    // hide popup when user click outside
    popup.click(function(e){
        const container = $('.innerPopupBox');

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            $('.popupBackground').hide();
        }
    });
});

function chiudiPopup() {
    $('.popupBackground').hide();
}
