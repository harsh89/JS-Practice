import "./App.css";
import styled from "styled-components";
// import PromiseComp from "./PromiseComp";
// import JsGeneratorComp from "./JsGeneratorComp";
// import MyPromise from "./MyPromise";
import EventLogger from "./EventLogger";
import SearchBox from "./SearchBoxV2";
import MinimalVirtualizedList from "./MinimalVirtualizedList"
// import PerformanceRefactor from "./PerformanceRefactor";
// import Timer from "./TimerRefactor";
// import returnDuplicates from "./returnDuplicates";
// import OrderBook from "./OrderBook";
// import StockPrice from "./StockPrice";
// import StockTicker from "./StockTicker/StockTicker";
// import FractionalShares from "./FractionalShares";
// import UserList from './UserListRefactorExample'

const Button = styled.button`
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`;

// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  width: 100%;

  .child {
    height: 100px;
    border: 1px solid white;
  }
`;

function App() {
  // Use memo to call an API

  // function sum(a, b) {
  //   console.log(a + b);
  // }

  // sum.call(null, 5, 5);

  // const person1 = {
  //   name: "bob",
  //   greet: function () {
  //     console.log(`hello ${this.name}`);
  //   },
  // };

  // const person2 = {
  //   name: "Charlie",
  // };

  // person1.greet.call(person2);

  // function multiply(factor, number) {
  //   console.log("number", number);
  //   console.log("factor", factor);

  //   console.log(number * factor);
  // }

  // const double = multiply.bind(null, 2);

  // double(2);
  // double(5);

  let user = {
    firstName: "John",
    sayHi() {
      console.log(`Hello, ${this.firstName}!`);
    },
  };

  const sayHi = user.sayHi.bind(user);

  setTimeout(sayHi(), 1000);

  // console.log(document.visibilityState)
  // console.log(document.hidden)

  // document.addEventListener("visibilitychange", () => {
  //   // console.log(`visibility changed`, document.hidden)
  // });

  // const promise = MyPromise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("Simple Promise");
  //     // reject("OOPS.. there is an error");
  //   }, 1000);
  // });

  // promise.then((val) => console.log(val), (val) => {console.log('via then:' + val)});
  // promise.then((val) => console.log(val));
  // promise.then((val) => console.log(val));
  // promise.catch((val) => console.log(val));

  // const promise2 = new MyPromise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("Chain Promise");
  //     // reject("OOPS.. there is an error");
  //   }, 1000);
  // });

  // promise2.then((val) => {
  //   console.log('t1:' + val)
  //   return 'Via T1 => '+val;
  // })
  // .then((val) => {
  //   console.log('t2:' + val)
  //   return val;
  // })
  // .finally((val) => {
  //   console.log('F1')
  // })
  // .catch((val) => {
  //   console.log('catch block')
  // })
  // .finally((val) => {
  //   console.log('final finally')
  // })

  async function mockUpload(batch, signal) {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 4000;

      const timerId = setTimeout(() => {
        if (signal.aborted) reject(new DOMException("ABORTED", "ABORT ERROR"));
        console.log("Uploaded batch: ", batch);
        resolve();
      }, delay);

      signal.addEventListener("abort", () => {
        clearTimeout(timerId);
        reject(new DOMException("ABORTED", "ABORT ERROR"));
      });
    });
  }

  const logger = EventLogger(2000, mockUpload);
  logger.log("Event 1");
  setTimeout(() => logger.log("Event 2"), 500);
  setTimeout(() => logger.log("Event 3"), 5500);
  setTimeout(() => logger.log("Event 4"), 4500);
  setTimeout(() => logger.stop(), 18000);

  // console.log(returnDuplicates('the dog is the best best'))

  // const book = new OrderBook();
  // book.addOrder("150", "5", "buy");
  // book.addOrder("145", "3", "sell");
  // console.log(book.getTotalExecuted());

  // const orders1 = [["AAPL", "B", "42", "100"]];
  // const inventory1 = [["AAPL", "99"]];
  // const buyFractionalShares = new FractionalShares();
  // const result1 = buyFractionalShares(orders1, inventory1);

  return (
    <div className="App">
      <header className="App-header">
        {/* <Button> Styled Button </Button> */}

        {/* <TomatoButton as="a" href="#" $primary>
          {" "}
          Tomato Styled Button{" "}
        </TomatoButton> */}

        <SearchBox> </SearchBox>
        <br></br>
        <br></br>
        <br></br>

        <MinimalVirtualizedList></MinimalVirtualizedList>

        <br></br>
        <br></br>
        <br></br>

        {/* <PerformanceRefactor></PerformanceRefactor> */}

        {/* <Timer></Timer> */}

        {/* <UserList> </UserList> */}

        {/* <StockPrice></StockPrice> */}

        {/* <PromiseComp></PromiseComp> */}

        {/* <JsGeneratorComp></JsGeneratorComp> */}

        {/* <StockTicker></StockTicker> */}
      </header>
    </div>
  );
}

export default App;
