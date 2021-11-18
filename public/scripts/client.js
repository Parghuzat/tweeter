/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/






$(document).ready(function() {

  $("#errormsg").hide();
  
  $("#addtweet").submit(function(event){
    event.preventDefault();
    let input = $("#tweet-text").val();
    console.log(input);
    if (input === null || input === '') {
      $("#errormsg").show();
      $("#errormsg").html("Can't be an empty feild");
    
    } else if (input.length > 140) {
      $("#errormsg").show();
      $("#errormsg").html("Over max characheters (140)");
    } else {
      $.ajax({
        type: "POST",
        url: '/tweets/',
        data: $("#addtweet").serialize(),
        success: function(){
          $.ajax({
            type: "GET",
            url: '/tweets/',
          }).then(function(data){
            $("#tweets").prepend(createTweetElement(data[data.length-1]));
          })
        }
      });
    }
  })

  const renderTweets = function(tweets) {
    for (const obj of tweets) {
      $("#tweets").append(createTweetElement(obj));
    }
  }

  function createTweetElement (tweetData) {
    let timeDifference = timeago.format(tweetData.created_at);
    return `
      <article>
        <header>
          <div class="usericon">
            <img class="avatar" src="${tweetData.user.avatars}">
            <span>${tweetData.user.name}</span>
          </div>
          <span>${tweetData.user.handle}</span>
        </header>
        <div class="tweetcontent">
            ${tweetData.content.text}
        </div>
        <footer>
          <span>${timeDifference}</span>
          <span>
            <i class="fa">&#xf024;</i>
            <i class="fa">&#xf079;</i>
            <i class="fa">&#xf004;</i>
          </span>

        </footer>
      </article>
      `
  }

  function loadTweets () {
    $.ajax({
      type: "GET",
      url: '/tweets/',
    }).then(function(data){
      renderTweets(data.reverse());
    });

  }
  loadTweets();
});