document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.product-card');
  const cartSummary = document.getElementById('cartSummary');
  const whatsappBtn = document.getElementById('whatsappOrder');
  const WHATSAPP_NUMBER = '919360230753';

  const state = {};

  cards.forEach(card => {
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const qtyValue = card.querySelector('.qty-value');
    const minus = card.querySelector('.minus');
    const plus = card.querySelector('.plus');
    const addBtn = card.querySelector('.add-btn');

    state[name] = { price, qty: 0 };

    function updateDisplay() {
      qtyValue.textContent = state[name].qty;
    }

    minus.addEventListener('click', () => {
      if (state[name].qty > 0) {
        state[name].qty -= 1;
        updateDisplay();
        updateCart();
      }
    });

    plus.addEventListener('click', () => {
      state[name].qty += 1;
      updateDisplay();
      updateCart();
    });

    addBtn.addEventListener('click', () => {
      if (state[name].qty === 0) {
        state[name].qty = 1;
        updateDisplay();
      }
      updateCart();
    });
  });

  function updateCart() {
    let totalItems = 0;
    let totalPrice = 0;
    let lines = [];

    Object.entries(state).forEach(([name, item]) => {
      if (item.qty > 0) {
        totalItems += item.qty;
        totalPrice += item.qty * item.price;
        lines.push(`${name} x${item.qty} = ₹${item.qty * item.price}`);
      }
    });

    cartSummary.textContent = `${totalItems} items · ₹${totalPrice}`;

    const message = lines.length
      ? `Hello Cookwell, I would like to order:\n${lines.join('\n')}\nTotal: ₹${totalPrice}`
      : 'Hello Cookwell, I would like to place an order.';

    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  updateCart();
});
