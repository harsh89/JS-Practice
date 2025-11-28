import { useEffect, useState, useRef } from "react";

const useDebouncedQuery = (query, delay) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  
  useEffect( () => {
    const handler = setTimeout(() => {
      setDebouncedQuery((prev) => prev === query ? prev : query)
    }, delay)

    return () => { clearTimeout(handler)}
  }, [delay, query])

  return debouncedQuery
}

const throttle = (cb, delay) => {  
  let lastExecutionTime = 0;

  return function(...args) {
    let currentTime = Date.now();
    if(currentTime - lastExecutionTime >= delay) {
      lastExecutionTime = currentTime;

      return cb.apply(this, args);
    }
  }
}

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebouncedQuery(searchQuery, 2000);

  useEffect(() => {
    console.log('debounced:', debouncedQuery)
  }, [debouncedQuery])

  const handleThrottledCb = useRef( throttle(() => {
      console.log('click triggered')
    }, 2000)
  )

  const handleButtonClick = (e) => {
    e.preventDefault();
    handleThrottledCb.current();
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Type to search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button onClick={handleButtonClick}>Search</button>
    </form>
  );
};
export default SearchBox;
