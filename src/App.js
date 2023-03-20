import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Article from "./components/Article";

function App() {
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState("webdev");

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subreddit}/.json`)
      .then((res) => {
        if (res.status !== 200) {
          console.log("ERROR");
          return;
        }

        res.json().then((data) => {
          if (data != null) setArticles(data.data.children);
        });
      });
  }, [subreddit]);

  const handleChange = (e) => {
    setSubreddit(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon
          icon={faSearch}
          style={{ color: "#000000", marginRight: "10px" }}
        />
        <input
          type="text"
          className="input"
          value={subreddit}
          onChange={handleChange}
        />
      </header>
      <div className="articles">
        {articles != null
          ? articles.map((article, index) => (
              <Article key={index} article={article.data} />
            ))
          : ""}
      </div>
    </div>
  );
}

export default App;
