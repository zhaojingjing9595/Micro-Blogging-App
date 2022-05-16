import React from "react";
import './HomePage.css'
import TweetForm from "../Components/TweetForm";
import TweetsList from "../Components/TweetsList";

function HomePage() {
 
   
  return (
    <div className="home-container mx-auto">
      <TweetForm />
      <TweetsList />
    </div>
  );
}

export default HomePage;
