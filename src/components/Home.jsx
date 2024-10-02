import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [jokes, setJokes] = useState();
  const [loading, setLoading] = useState(true);
  const [Next, setNext] = useState(false);
  const [Previous, setPrevious] = useState(false);
  const [Page, setPage] = useState(1)

  function componentDidMount() {
    fetch(
      `http://localhost:8080/api/v1/public/randomjokes?limit=10&query=all&inc=categories%2Cid%2Ccontent&page=${Page}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.data);
        setJokes(res.data.data);
        setNext(res.data.nextPage)
        setPrevious(res.data.previousPage)
        setLoading(false);
        return res;
      });
  }
  useEffect(() => {
    async function getData() {
      const data = componentDidMount();
    }
    getData();
  }, [Page]);
  let nextPage = ()=>{
    if (Next) {
      setPage(Page+1)
      console.log(Page); 
    }
  }
  const previousPage = ()=>{
    if (Previous && Page>=1) {
      setPage(Page - 1)
      console.log(Page);
    }
  }

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-900 flex items-center justify-center">
        <h1 className="text-4xl text-center font-bold text-gray-300">
          Lading.......
        </h1>
      </div>
    );
  }

  return (
    <div className="p-5 bg-gray-900">
      <h1 className="text-yellow-200 text-center text-4xl mb-10">
        Funniest short jokes to make you lol
      </h1>
      <div className="flex justify-center gap-10">
        <div>
          {
            <div className="">
              {jokes &&
                jokes.map((item) => (
                  <div key={item.id} className="m-5 max-w-96">
                    <h2 className="text-orange-400">
                      *********************************************************
                    </h2>
                    <h2 className="text-red-300 text-center font-semibold text-2xl mx-2">
                      {item.content}
                    </h2>
                    {/* <p className="text-gray-400 text-center font-semibold text-lg">{item.punchline}</p> */}
                  </div>
                ))}
            </div>
          }
        </div>
      </div>

      
      <div class="flex w-full justify-center mt-10">
        <a
          onClick={previousPage}
          className="flex items-center justify-center cursor-pointer px-4 h-10 me-3 text-base font-medium text-gray-500  border rounded-lg  bg-gray-800 border-gray-700  hover:bg-gray-700 hover:text-white"
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </a>
        <Link
          to={'/'}
          onClick={nextPage}
          className={`flex  items-center justify-center cursor-pointer px-4 h-10 me-3 text-base font-medium text-gray-500  border rounded-lg  bg-gray-800 border-gray-700  hover:bg-gray-700 hover:text-white`}
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Home;
