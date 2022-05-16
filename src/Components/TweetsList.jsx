import React, { useContext } from "react";
import Tweet from "./Tweet";
import HomePageContext from "../Contexts/HomePageContext";

function TweetsList() {
  const { tweets } = useContext(HomePageContext);
  const sortedTweets = tweets.sort((a, b) => (b.date - a.date))
  console.log(sortedTweets);
    return (
      <div className="tweets-list pb-3">
        {sortedTweets.map((tweet) => (<Tweet key={tweet.date} tweetObj={tweet} />)
          // let user = users.find(users.find((user) => user.userId === tweet.userId));
          // return <Tweet key={tweet.date} tweetObj={tweet} />;
        // }
        )}
      </div>
    );
}

export default TweetsList;
