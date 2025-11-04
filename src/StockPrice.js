import { useState, useEffect } from "react";

// Buggy Code (Given in interview)
function StockPrice({ symbol }) {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  
//   setLoading(true);  
  
  useEffect(() => {
    setLoading(true);
    fetch(`/api/price/${symbol}`)
      .then(res => res.json())
      .then(data => {
        setPrice(data.price);
        setLoading(false);
      });
  }, [symbol]); 
  
  return <div>{loading ? 'Loading...' : `$${price}`}</div>;
}

export default StockPrice;