// uses jQuery to load to the page
$(document).ready(function() {
  renderTweets(tweetsData);

  // submit event handler for creating a new tweet
  $( "#tweet-form" ).submit(function( event ) {
    event.preventDefault();
    // post request to server upon submission
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $('#tweet-form').serialize()
    })
      .then(function( res ) {
        console.log(res);
      });
    // create a text string in URL-encoded notation
    console.log($(this).serialize());
    // $(this).serialize();
    // alert( "Handler for .submit() called." );
  });
});
// takes in an array of several tweet objects and appends them to the old tweets section
const renderTweets = function(tweetsData) {
  // loops through tweets to call createTweetElement for each tweet object in tweetsData array
  for (const tweet of tweetsData) {
    // takes return value and appends it to the tweets container
    $('.old-tweets').append(createTweetElement(tweet));
  }
};
// takes in a tweet object, returns a tweet <article> containing the entire HTML structure of tweet
const createTweetElement = function(tweetData) {
  //use jQuery to construct new elements using $
  const $tweetHTML = $(
    `<article class="tweet">
      <header>
        <div id="tweet-user">
          <img src="${tweetData.user.avatars}"> 
          <span id="tweet-username">${tweetData.user.name}</span>
        </div>
        <span id="tweet-handle">${tweetData.user.handle}</span>
      </header>
      <br>
      <p>${tweetData.content.text}</p>
      <br>
      <footer>
        <span id="tweet-timestamp">${timeago.format(tweetData.created_at)}</span>
        <div id="tweet-icons">
          <span><i class="fas fa-flag"></i></span>
          <span><i class="fas fa-retweet"></i></span>
          <span><i class="fas fa-heart"></i></span>
        </div>
      </footer>
    </article>`
  );
  return $tweetHTML;
};

// Test / driver code (temporary). Eventually will get this from the server.
const tweetsData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

///SUBMIT EVENT

