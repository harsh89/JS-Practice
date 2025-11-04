import MyPromise from "./MyPromise";

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Simple Promise");
  }, 1000);
});

promise.then((val) => console.log(val))
