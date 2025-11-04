class ApiHelper {
  constructor() {
    this.cache = new Map();
    this.ttl = 10000;
  }

  #cacheData(key, data) {
    const timeStamp = new Date();
    const cachedObj = {
      data,
      timeStamp,
    };

    this.cache.set(key, cachedObj);
  }

  #retrieveData(key) {
    const currTimeStamp = new Date();
    const cachedData = this.cache.get(key);
    if (cachedData && currTimeStamp - cachedData.timeStamp > this.ttl) {
      console.log(
        "🚀 ~ ApiHelper ~ currTimeStamp - cachedData.timeStamp:",
        currTimeStamp - cachedData.timeStamp
      );
      console.log("🚀 ~ ApiHelper ~ Delete cachedData:", cachedData);
      this.cache.delete(key);
    } else if (cachedData) {
      return cachedData?.data;
    }
  }

  async #fetchWithRetry(endPoint, params, attempts = 1) {
    try {
      const response = await fetch(endPoint, params);
      console.log("🚀 ~ ApiHelper ~ response:", response)
      if (!response.ok) {
        if (response.status >= 500 && attempts <= 3) {
          attempts++;
          await new Promise((res) => setTimeout(res, 3000));
          return this.#fetchWithRetry(endPoint, params, attempts);
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      if (attempts <= 3) {
        attempts++;
        await new Promise(res => setTimeout(res, 3000))
        return this.#fetchWithRetry(endPoint, params, attempts);
      }
      throw error;
    }
  }

  async fetchData(baseUrl, endPoint='', method = "GET", params) {
    const url = endPoint ? `${baseUrl}/${endPoint}` : baseUrl;
    try {
      const retrievedData = this.#retrieveData(endPoint);

      if (retrievedData) {
        console.log(
          "🚀 ~ ApiHelper ~ fetched cached Data ~ res:",
          retrievedData
        );
        return retrievedData;
      }

      const response = await this.#fetchWithRetry(url, {
        method: method,
        params: params,
        headers: {
          "content-type": "application/json",
        },
      });

      // const response = await fetch(url, {
      //     method: method,
      //     params: params,
      //     headers: {
      //         'content-type': 'application/json'
      //     }
      // })

      console.log("🚀 ~ ApiHelper ~ fetchData ~ this.cache:", this.cache);
      this.#cacheData(endPoint, response);
      return response;
    } catch (error) {
      console.error("Error fetch API data:", error);
      throw error;
    }
  }
}

export default ApiHelper;
