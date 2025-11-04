const PromiseComp = () => {
    // function delay(ms) {
    //     return new Promise(function (resolve, reject) {
    //         setTimeout(resolve, ms); 
    //     });
    //   }
    
    //   delay(5000).then(() => console.log('5 seconds have passed'))
    
    //   // Promises
    //   let p1 = new Promise((resolve, reject) => {
    //     setTimeout(resolve, 4000);
    //   });
    
    //   console.log('p1 executed')
    
    //   let p2 = new Promise((resolve, reject) => {reject('p2 promise rejects')})
    
    //   console.log('p2 executed')
    
    //   p1.then(res => console.log(res, 'p1 then executed after 4 seconds'))
    
    //   p2.then(res => console.log('res2')).catch(err => console.log(err, 'p2 then executed'))
    
    
      //Custom Promise
    
      function MyPromise(executor) {
        let onResolve;
        let onReject;
        let isFulfilled = false;
        let isRejected = false;
        let isCalled = false;
        let value;
        let error;
    
        function resolve(val) {
          isFulfilled = true;
          value = val;
          if(typeof onResolve === 'function' && !isCalled) {
            onResolve(val);
            isCalled = true;
          }
        }
    
        function reject(err) {
          isRejected = true;
          error = err;
          if(typeof onReject === 'function' && !isCalled) {
            onReject(err);
            isCalled = true;
          }
        }
    
        this.then = function(thenHandler){
          onResolve = thenHandler;
          if(!isCalled && isFulfilled) {
            onResolve(value);
            isCalled = true;
          }
          return this;
        }
    
        this.catch = function(catchHandler){
          onReject = catchHandler;
          if(!isCalled && isRejected) {
            onReject(error);
            isCalled = true;
          }
          return this;
        }
    
        executor(resolve, reject)
      }
    
      MyPromise.resolve = (val) => {
        return new MyPromise(function executor(resolve, reject) {
          resolve(val);
        })
      }
    
      MyPromise.resolve = (error) => {
        return new MyPromise(function executor(resolve, reject) {
          reject(error);
        })
      }
    
      MyPromise.all = (promises) => {
        return new MyPromise(function executor(resolve, reject) {
          let count = 0;
          let res = [];
    
          if(!promises.length) {
            resolve(promises);
            return;
          }
    
          promises.forEach((promise, i) => {
            promise.then(val => done(val, i))
            .catch(err => reject(err))
          });
    
          function done(val, i) {
            ++count;
            res[i] = val;
            
            if(count === promises.length) {
              resolve(res)
            }
          }
        })
      }
    
      let myTestPromise = new MyPromise(
        function executor(resolve, reject){
          
          // setTimeout(resolve(123), 500);
          reject('No success')
        }
      )
    
      myTestPromise.then((res) => console.log('res',res))
      .catch(error => console.log('error', error))
    
      let urls = [
        'https://api.github.com/users/vedanthb',
        'https://api.github.com/users/batman'
      ];
    
      MyPromise.all(urls.map((url) => fetch(url)))
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

    return (<div> Promise Comp </div>)
}

export default PromiseComp;