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

 const createTweetElement = obj => {
   const $header = `
    <header class="tweet">
    <span class="tweet-profile">
    <img src=${obj.user.avatars}>
    <p class="tweet-name profile bold">${obj.user.name}</p>
    </span>
    <p class="tweet-logname profile bold">${obj.user.handle}</p>
    </header>`

    const $p = `<p class="tweet-input bold">${escape(obj.content.text)}</p>`;

    const $footer = `
    <footer>
    <p class="tweet-days bold">${obj.created_at}</p> 
    <div class="tweet-icons">
      <a><img src="https://www.flaticon.com/svg/vstatic/svg/725/725689.svg?token=exp=1614128652~hmac=9f64081a0dd18809e25f3a8908619045" alt="flag"></a>
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

}

const loadTweets = () => {
  $.ajax('/tweets', {
    method: 'GET',
    success: response => renderTweets(response)
  })
  console.log('response');
  console.log(response);
}



$('#tweet-text').on('submit', function(event) {
  event.preventDefault();
  // console.log('this');
  // console.log(this);
  const data = $(this).serialize();
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
        $("#alert-container").css("display", "none");
        loadTweets();
      } 
      
  })
}

})
});


