import { useEffect, useState, useCallback, useMemo } from "react";

const useApiRequest = (baseUrl, endPoint, method = "GET", params) => {
  const cache = useMemo(() => new Map(), []);
  const ttl = 10000;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cacheData = useCallback((key, data) => {
    const timeStamp = new Date();
    const cachedObj = {
      data,
      timeStamp,
    };

    cache.set(key, cachedObj);
  }, [cache]);

  const retrieveData = useCallback((key) => {
    const currTimeStamp = new Date();
    const cachedData = cache.get(key);
    if (cachedData && currTimeStamp - cachedData.timeStamp > ttl) {
      console.log(
        "🚀 ~ ApiHelper ~ currTimeStamp - cachedData.timeStamp:",
        currTimeStamp - cachedData.timeStamp
      );
      console.log("🚀 ~ ApiHelper ~ Delete cachedData:", cachedData);
      cache.delete(key);
    } else if (cachedData) {
      return cachedData?.data;
    }
  }, [cache, ttl]);

  const fetchWithRetry = useCallback(async (endPoint, params, attempts = 1) => {
    try {
      const response = await fetch(endPoint, params);
      console.log("🚀 ~ ApiHelper ~ response:", response);
      if (!response.ok) {
        if (response.status >= 500 && attempts <= 3) {
          attempts++;
          await new Promise((res) => setTimeout(res, 3000));
          return fetchWithRetry(endPoint, params, attempts);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (attempts <= 3) {
        attempts++;
        await new Promise((res) => setTimeout(res, 3000));
        return fetchWithRetry(endPoint, params, attempts);
      }
      throw error;
    }
  }, []);

  const fetchData = useCallback(
    async (baseUrl, endPoint, method = "GET", params) => {
      const url = `${baseUrl}/${endPoint}`;
      try {
        const retrievedData = retrieveData(endPoint);

        if (retrievedData) {
          console.log(
            "🚀 ~ ApiHelper ~ fetched cached Data ~ res:",
            retrievedData
          );
          return retrievedData;
        }

        const response = await fetchWithRetry(url, {
          method: method,
          params: params,
          headers: {
            "content-type": "application/json",
          },
        });

        console.log("🚀 ~ ApiHelper ~ fetchData ~ cache:", cache);
        cacheData(endPoint, response);
        return response;
      } catch (error) {
        console.error("Error fetch API data:", error);
        throw error;
      }
    },
    [fetchWithRetry, retrieveData, cacheData, cache]
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    if(!baseUrl || !endPoint) {
      setLoading(false);
      return;
    }

    fetchData(baseUrl, endPoint, method, params)
    .then((res) => {
      setData(res);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });

  }, [baseUrl, endPoint, method, params, fetchData]);

  return {data, error, loading};

};

export default useApiRequest;
