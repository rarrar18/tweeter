$(document).ready(function() {
  const $tweetText = $('#tweet-text');
  // create event listener where 'this' refers to the tweetText textarea
  $tweetText.on('input', function() {
    // check the amount of characters in the input form
    const tweetCharLeft = 140 - $(this).val().length;
    // navigate to the counter output from textarea input
    const $counter = $(this).parent('div').siblings('div').children('.counter');
    // counter should update to the remaining characters left on the textarea input
    $counter.html(tweetCharLeft);
    // check if the tweet char length is over 140 characters, if so turn counter red
    tweetCharLeft < 0 ? $counter.addClass('invalid') : $counter.removeClass('invalid');
    // make sure you cannot press submit if counter is red
  });
});

//Using jQuery and an appropriate selector, register an event handler to the textarea element for the form inside of the .new-tweet section.

// $("#tweet-text").on('input', function() {
//   console.log(this);
// });