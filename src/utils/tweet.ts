import tweets from "./../config/whitelist-tweets.json";

// get random tweet message
const randomTweetMessage = () => {
  const randomIndex = Math.floor(Math.random() * tweets.length);
  return tweets[randomIndex];
};

export { randomTweetMessage };
