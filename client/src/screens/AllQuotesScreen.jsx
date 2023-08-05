import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const AllQuotesScreen = () => {
  const [userID, setuserID] = useState(null);
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setuserID(u?.emailId);
  }, []);
  const [quotesData, setQuotesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  const header = {
    "X-Api-Key": "Eoh3wWttSn+rjGeKFSg1Xw==peyGpyL9VVQ0oBP3",
  };
useEffect(() => {
  fq();
}, [])

  useEffect(() => {
    // fq()
    fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fq = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("http://localhost:3000");
      setQuotesData((prevData) => [...prevData, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
            setIsLoading(false);

    }
  };


  useEffect(() => {
    window.addEventListener("scroll", () => {
      setPage((fc) => {
        if (
          window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight
        ) {
          console.log(fc + 1);
          return fc + 1;
        } else {
          return fc;
        }
      });
    });
  }, [])
  

  const fetchQuotes = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/quotes`,
        {
          headers: header,
          params: {
            // category: "happiness",
            limit: 10,
            page: page,
          },
        }
      );
      // console.log(response);
      setQuotesData((prevData) => [...prevData, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center relative">
      <div className="p-3 rounded-full bg-yellow-400 text-black fixed bottom-5 right-5">
        {page}
      </div>
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
      {isLoading && <p>Loading...</p>}
      <div ref={containerRef}></div>
    </div>
  );
};

export default AllQuotesScreen;
