// ECMA 262

const STATE = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  FAILURE: "FAILURE",
};

// Utils

const isFunction = (func) => typeof func === "function";

function MyPromise(callback) {
  let state = STATE.PENDING;
  const thenCallbacks = [];
  const catchCallbacks = [];

  const executeCallbacks = (val) => {
    if (isFunction(val?.then)) {
      val.then(resolve, reject);
      return;
    }

    const callbacks =
      state === STATE.FULFILLED ? thenCallbacks : catchCallbacks;

    callbacks.forEach((callback) => {
      queueMicrotask(() => callback(val));
    });
  };

  const resolve = (val) => {
    state = STATE.FULFILLED;
    try {
      executeCallbacks(val);
    } catch (error) {
      reject(val);
    }
  };

  const reject = (val) => {
    state = STATE.FAILURE;
    executeCallbacks(val);
  };

  callback(resolve, reject);

  return {
    then(thenCallback, catchCallback) {
      return new MyPromise((nextResolve, nextReject) => {
        // Then
        thenCallbacks.push((result) => {
          if (isFunction(thenCallback)) {
            nextResolve(thenCallback(result));
          } else {
            nextResolve(result);
          }
        });

        // Catch
        catchCallbacks.push((result) => {
          if (isFunction(catchCallback)) {
            nextReject(catchCallback(result));
          } else {
            nextReject(result);
          }
        });

        //BASIC (not chained)
        // if(thenCallback && isFunction(thenCallback)){
        //     thenCallbacks.push(thenCallback);
        // }

        // if(catchCallback && isFunction(catchCallback)){
        //     catchCallbacks.push(catchCallback);
        // }
      });
    },
    catch(callback) {
      return this.then(null, callback);
    },
    finally(callback) {
      return this.then(
        (result) => {
          callback();
          return result;
        },
        (error) => {
          callback();
          return error;
        }
      );
    },
  };
}

export default MyPromise;
