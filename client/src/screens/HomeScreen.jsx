import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [userID, setuserID] = useState(null);
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user'))
    setuserID(u?.emailId);
  }, [])
  
  const [quotesData, setQuotesData] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleQuoteChange = (event) => {
    setQuote(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  useEffect(() => {
    fetchQuotes();
  }, [userID]);

  const fetchQuotes = async () => {
      // if(userID)
    try {
      const response = await axios.post("http://localhost:3000", {
        userID: userID,
      });
      setQuotesData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const btnclick = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = async () => {
    if (!quote || !author) {
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:3000/create_quote", {
        authorID:userID,
        quote,
        author,
      });
      setQuote("");
      setAuthor("");
      setIsLoading(false);
      setIsShow(false);
      fetchQuotes(); // Fetch the updated quote list after posting the data
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col justify-center relative">
      
      {isShow && (
        <div className="flex absolute top-0 bottom-0 right-0 left-0 flex-col items-center py-8 px-4 sm:px-8">
          <div className="max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 relative">
            <button onClick={()=>setIsShow(!isShow)} className="absolute top-5 right-5 hover:cursor-pointer hover:bg-gray-500 hover:rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Add a Quote</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quote"
              >
                Quote
              </label>
              <textarea
                className="w-full h-24 px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="quote"
                placeholder="Enter your quote"
                value={quote}
                onChange={handleQuoteChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="author"
              >
                Author
              </label>
              <input
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                id="author"
                placeholder="Enter author's name"
                value={author}
                onChange={handleAuthorChange}
              />
            </div>
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      )}
      <button
        onClick={btnclick}
        className="fixed flex gap-2 items-center hover:bg-blue-800 bottom-0 right-0 p-3 bg-blue-500 rounded-lg m-5"
      >
        <h1 className="text-yellow-200">Add your Quotes</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <div className="px-8 py-5">
        {quotesData &&
          quotesData.map((item, ind) => (
            <div
              className="bg-white border-2 border-gray-200 rounded-lg p-6 sm:p-8 mb-4"
              key={ind}
            >
              <div className="text-3xl text-gray-800 italic mb-8">
                <div className="text-4xl text-gray-300 absolute -left-3 -top-3">
                  &ldquo;
                </div>
                {item.quote}
                <div className="text-4xl text-gray-300 absolute right-0 bottom-0 -mb-8 -mr-8">
                  &rdquo;
                </div>
              </div>
              <p className="text-lg text-gray-600">{item.author}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeScreen;
