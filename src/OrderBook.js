function OrderBook() {
  const buyOrders = []; // Max heap (highest price first)
  const sellOrders = []; // Min heap (lowest price first)
  let totalExecuted = 0;

  function addOrder(price, quantity, action) {
    const order = { price: parseFloat(price), quantity: parseInt(quantity) };

    if (action === "buy") {
      while (
        sellOrders.length > 0 &&
        sellOrders[0].price <= order.price &&
        order.quantity > 0
      ) {

        const sellOrder = sellOrders[0];
        const executed = Math.min(sellOrder.quantity, order.quantity);
        totalExecuted += executed;
        order.quantity -= executed;
        sellOrder.quantity -= executed;

        if (sellOrder.quantity === 0) {
          sellOrders.shift();
        }
      }

      if (order.quantity > 0) {
        buyOrders.push(order);
        buyOrders.sort((a, b) => b.price - a.price);
      }
    } else {
      while (
        buyOrders.length > 0 &&
        buyOrders[0].price >= order.price &&
        order.quantity > 0
      ) {
        const buyOrder = buyOrders[0];
        const executed = Math.min(buyOrder.quantity, order.quantity);

        order.quantity -= executed;
        totalExecuted += executed;
        buyOrder.quantity -= executed;

        if (buyOrder.quantity === 0) {
          buyOrders.shift();
        }
      }

      if (order.quantity > 0) {
        sellOrders.push(order);
        sellOrders.sort((a, b) => a.price - b.price);
      }
    }
    return totalExecuted;
  }

  return { addOrder, getTotalExecuted: () => totalExecuted };
}

export default OrderBook;
