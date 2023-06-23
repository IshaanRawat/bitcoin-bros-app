import tweets from "./../config/tweetMessages.json";

// get random tweet message
const randomTweetMessage = () => {
  const randomIndex = Math.floor(Math.random() * tweets.length);
  return tweets[randomIndex];
};

export { randomTweetMessage };
