// uses jQuery to load to the page
$(document).ready(function() {
  // fetches tweets from localhost:8080/tweets page
  const loadTweets = function() {
    // use jQuery to make a request to /tweets and receive the array of tweets as JSON
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json",
      success: (tweets) => {
        renderTweets(tweets);
      }
    });
  };
  
  loadTweets();
  // escape function to hide user inputted text
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // takes in a tweet object, returns a tweet <article> containing the entire HTML structure of tweet
  const createTweetElement = function(tweet) {
    //use jQuery to construct new elements using $ with template literals
    const $tweet =
      `<article class="tweet">
        <header>
          <div id="tweet-user">
            <img src="${tweet.user.avatars}"> 
            <span id="tweet-username">${tweet.user.name}</span>
          </div>
          <span id="tweet-handle">${tweet.user.handle}</span>
        </header>
        
        <p>${escape(tweet.content.text)}</p>
        
        <footer class="tweet-footer">
          <span id="tweet-timestamp">${timeago.format(tweet.created_at)}</span>
          <div id="tweet-icons">
            <span><i class="fas fa-flag"></i></span>
            <span><i class="fas fa-retweet"></i></span>
            <span><i class="fas fa-heart"></i></span>
          </div>
        </footer>
      </article>`
    ;
    
    return $tweet;
  };
  
  // takes in an array of several tweet objects and appends them to the old tweets section
  const renderTweets = function(tweets) {
    $('.old-tweets').empty();
    // loops through tweets to call createTweetElement for each tweet object in tweets array
    for (const tweet of tweets) {
      // formats every tweet in tweets array
      const $tweet = createTweetElement(tweet);
      // takes return value and prepends it to the tweets container
      $('.old-tweets').prepend($tweet);
    }
  };

  const $tweetForm = $('#tweet-form');
  // submit event handler for creating a new tweet
  $tweetForm.submit(function(event) {
    event.preventDefault();
    console.log($("#tweet-text").val());
    // check if the value in the tweet text area is over 140 chars
    if ($("#tweet-text").val().length > 140) {
      $('#tweet-error').empty();
      // if it goes over the value, submit button should not work
      const $errMsg = `Error: Surpassed the 140 character limit!`;
      // takes return value and apppends it to the error container
      $('#tweet-error').append($errMsg);
      // check if the error box is hidden, if it is, display it
      if ($("#tweet-error").is(":hidden")) {
        $("#tweet-error").slideDown("slow");
      }
      // check if the value within the tweet text area is empty
    } else if ($("#tweet-text").val().length === 0) {
      $('#tweet-error').empty();
      // if it goes over the value, submit button should not work
      const $errMsg = `Error: Submitted an empty form!`;
      // takes return value and apppends it to the error container
      $('#tweet-error').append($errMsg);
      if ($("#tweet-error").is(":hidden")) {
        $("#tweet-error").slideDown("slow");
      }
    } else {
      // post request to server upon submission
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      })
        .then(function() {
          $("#tweet-error").slideUp("slow");
          loadTweets();
        });
    }
  });
});