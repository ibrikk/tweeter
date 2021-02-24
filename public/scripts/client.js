/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() { 

 const createTweetElement = obj => {
   const $header = `
    <header class="tweet">
    <span class="tweet-profile">
    <img src=${obj.user.avatars}>
    <p class="tweet-name profile bold">${obj.user.name}</p>
    </span>
    <p class="tweet-logname profile bold">${obj.user.handle}</p>
    </header>`

    const $p = `<p class="tweet-input bold">${obj.content.text}</p>`;

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
    console.log(createTweetElement(tweet));
    $tweetsContainer.append(createTweetElement(tweet));
  }

}

const loadTweets = () => {
  $.ajax('/tweets', {
    method: 'GET'
  })
}




$('#tweet-text').on('submit', function(event) {
  event.preventDefault();
  // console.log('this');
  // console.log(this);
  const data = $(this).serialize();
  $.ajax('/tweets', {
    method: 'POST', 
    data,
    success: () => console.log(data)
    }
  })
})
 


});


