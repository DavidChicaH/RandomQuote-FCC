import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState({});
  const [backgroundColor, setBackgroundColor] = useState("");
  const [shouldFadeIn, setShouldFadeIn] = useState(false);

  const getRandomColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 16).toString(16);
    }

    return color;
  };
  const getRandomQuote = async (url) => {
    let response = await fetch(url);
    let json = await response.json();

    setQuote({
      quoteContent: json[0].content,
      author: json[0].author,
    });

    setBackgroundColor(getRandomColor);
    setShouldFadeIn(true);
  };

  const handleNewQuote = () => {
    setShouldFadeIn(false);
    setTimeout(
      () => getRandomQuote("https://api.quotable.io/quotes/random"),
      500
    );
  };

  useEffect(() => {
    getRandomQuote("https://api.quotable.io/quotes/random");
  }, []);

  return (
    <div className="wrapper" style={{ backgroundColor: backgroundColor }}>
      <div id="quote-box">
        <p
          id="text"
          className={shouldFadeIn ? "fade-in" : ""}
          style={{ color: backgroundColor }}
        >
          {quote.quoteContent ? quote.quoteContent : "cargando"}
        </p>
        <blockquote id="author" style={{ color: backgroundColor }}>
          {" "}
          - {quote.author}
        </blockquote>

        <div className="buttons">
          <div
            className="twitter-wrapper"
            style={{ backgroundColor: backgroundColor }}
          >
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                quote.quoteContent + " - " + quote.author
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              id="tweet-quote"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
          <button
            id="new-quote"
            style={{ backgroundColor: backgroundColor }}
            onClick={handleNewQuote}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
