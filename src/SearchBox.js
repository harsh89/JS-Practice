import { useEffect, useState, useMemo } from "react";
import useApiRequest from "./useApiRequest";
import ApiHelper from "./ApiHelper";

const SearchBox = () => {
  // const apiHelper = useMemo(() => new ApiHelper(), []);

  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const baseUrl = "https://restcountries.com/v3.1/name";

  function debounce(fn, delay) {
    let timer = {};

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }

  const { data, error, loading } = useApiRequest(
    baseUrl,
    `${debouncedQuery}`,
    "GET"
  );

  console.log("Response from useApiRequest:", data);

  // useEffect( ()=> {
  //   const fetchData = async () => {
  //     try {
  //       const res = await apiHelper.fetchData('https://restcountries.com/v3.1', `name/${debouncedQuery}`, 'GET');

  //     } catch(error) {
  //       console.log(error);
  //       setErrorMessage("Error fetching data. Please try again later.");
  //     }

  //     // console.log(res);
  //   }
  //   if(debouncedQuery) {
  //     fetchData();
  //   }
  // }, [debouncedQuery, apiHelper])

  const handleSearch = debounce((query) => {
    console.log("Searching for:", query);
    setDebouncedQuery(query);
    //     apiHelper.fetchData(`name/${query}`)
  }, 250);

  function throttle(fn, delay) {
    let lastExecutionTime = 0;

    return function (...args) {
      const currentTime = Date.now();

      if (currentTime - lastExecutionTime >= delay) {
        lastExecutionTime = currentTime;
        return fn.apply(this, args);
      }
    };
  }

  const handleClick = (e) => {
    e.preventDefault();

    try {
      callApi();
    } catch (e) {
      throw e;
    }
  };

  const callApi = throttle(async (e) => {
    console.log("API called");
  }, 1500);

  return (
    <form>
      <p>{errorMessage}</p>
      <input
        type="text"
        placeholder="Type to search..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      <button placeholder="Type to search..." onClick={handleClick}>
        Search
      </button>
    </form>
  );
};
export default SearchBox;
