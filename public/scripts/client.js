/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() { 

  const escape = str => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createdAt = time => {
    const timeDifference = Date.now() - time;
    if (timeDifference >= 31556952000) {
      return `${Math.floor(timeDifference / 31556952000)} years`;
    } else if (timeDifference >= 2592000000) {
      return `${Math.floor(timeDifference / 2592000000)} months`;
    } else if (timeDifference >= 604800000) {
      return `${Math.floor(timeDifference / 604800000)} weeks`;
    } else if (timeDifference >= 86400000) {
      return `${Math.floor(timeDifference / 86400000)} days`;
    } else if (timeDifference >= 3600000) {
      return `${Math.floor(timeDifference / 3600000)} hours`;
    } else if (timeDifference >= 60000) {
      return `${Math.floor(timeDifference / 60000)} minutes`;
    } else {
      return `${Math.floor(timeDifference / 1000)} seconds`;
    }
  }

 const createTweetElement = obj => {
   const $header = `
    <header class="tweet">
    <span class="tweet-avatar">
    <img src=${obj.user.avatars}>
    <p class="tweet-name profile bold">${obj.user.name}</p>
    </span>
    <p class="tweet-handle profile bold">${obj.user.handle}</p>
    </header>`

    const $p = `<div class="tweet-input bold">${escape(obj.content.text)}</div>`;

    const $footer = `
    <footer>
    <p class="tweet-days bold">${createdAt(obj.created_at)} ago</p> 
    <div class="tweet-icons">
      <a><img src="https://www.flaticon.com/svg/vstatic/svg/2164/2164609.svg?token=exp=1614532432~hmac=0e9246f0f54739e9420d467edbfa6853" alt="flag"></a>
      <a><img src="https://image.flaticon.com/icons/svg/3/3890.svg" alt="retweet"></a>
      <a><img src="https://image.flaticon.com/icons/svg/4/4458.svg" alt="like"></a>
    </div>
    </footer>`;

 return `
 <article>
  ${$header}
  ${$p}
  ${$footer}
 </article>
 `
}

const renderTweets = tweets => {
  const $tweetsContainer = $('#tweets-container');
  for (let tweet of tweets) {
    $tweetsContainer.prepend(createTweetElement(tweet));
  }
};

const loadTweets = () => {
  $.ajax('/tweets', {
    method: 'GET',
    success: function(response) {
      renderTweets(response);
    }
  });
};

loadTweets();

$('#tweet-text').on('submit', function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  // console.log(data)
  if (!data.slice(5)) {
    $('#alert-container').css('display', 'inherit');
    $('.error-message').text('Type something!')
  } else if (data.slice(5).length > 140) {
    $('#alert-container').css('display', 'inherit');
    $('.error-message').text('Your tweet is over 140 characters!')
  } else {
    $.ajax('/tweets', {
      method: 'POST', 
      data,
      success: function() {
        $("#tweet-text-area").val('');
        $(".counter").text(140);
        $("#alert-container").css("display", "none");
        loadTweets();
      } 
  });
}
});


$(".toggle-btn").on("click", function() {
  $(".new-tweet").slideToggle()
});

$(document).on('scroll', function() {
  if (
    document.body.scrollTop > 120 ||
    document.documentElement.scrollTop > 120
  ) {
    $("#scroll-up-btn").css("display", "block");
  } else {
    $("#scroll-up-btn").css("display", "none");
  }
});

$("#scroll-up-btn").on("click", function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
});
