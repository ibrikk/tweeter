$(document).ready(function() {
  $('#tweet-text-area').keyup(function() {
    let textLength = $(this).val().length;
    let counter = 140;
    if (counter - textLength < 0) {
      $('.counter').css('color', 'red');
    }
    $('.counter').text(counter - textLength);
  });
});



