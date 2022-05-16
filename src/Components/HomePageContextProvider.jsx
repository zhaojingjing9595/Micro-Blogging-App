import React, { useContext, useEffect, useState } from "react";
import HomePageContext from "../Contexts/HomePageContext";
import { addDoc, collection } from "firebase/firestore";
import { db, getData } from "../services/firebase";
import AuthContext from "../Contexts/AuthContext";

function HomePageContextProvider({ children }) {
  const { activeUser } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [loaderShow, setLoaderShow] = useState(false);
  // not sure how to test server error
  const [errorShow, setErrorShow] = useState("");

  useEffect(() => {
    let unsubscribeTweets;
    let unsubscribeUsers;
    if (activeUser) {
      getData("tweets", db, setTweets, unsubscribeTweets, "date");
      getData("users", db, setUsers, unsubscribeUsers, "userName");
    }
    // return () => {
    //   unsubscribeTweets();
    //   unsubscribeUsers();
    // };
  }, [activeUser]);

  // async function handleScroll() {
  //   const bottom =
  //     Math.cell(window.innerHeight + window.scroll) >=
  //     document.documentElement.scrollHeight;
  //   let unsubscribeTweets;
  //   if (bottom) {
  //     console.log("bottom ");
  //     getData("tweets", db, setTweets, unsubscribeTweets, "date");
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  function handleSetText(value) {
    setText(value);
  }

  async function handlePostNewTweet(e) {
    setLoaderShow(true);
    e.preventDefault();
    const newTweetObj = {
      userId: activeUser.uid,
      date: new Date().toISOString(),
      content: text,
    };
    try {
      await addDoc(collection(db, "tweets"), newTweetObj);
      setLoaderShow(false);
    } catch (e) {
      setErrorShow(e);
      console.error("Error adding document: ", e);
    }
    setText("");
  }

  return (
    <HomePageContext.Provider
      value={{
        tweets,
        users,
        onPostNewTweet: handlePostNewTweet,
        text,
        loaderShow,
        errorShow,
        onSetText: handleSetText,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
}

export default HomePageContextProvider;
