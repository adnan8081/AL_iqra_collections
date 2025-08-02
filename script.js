console.log("Website is ready!");
function changeImage(thumbnail) {
  const mainImage = document.getElementById("main-image");
  mainImage.src = thumbnail.src;
}
let cart = [];

function addToCart(productName, price) {
  const item = cart.find(p => p.name === productName);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name: productName, price: price, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.qty} <button onclick="removeItem(${index})">X</button>`;
    cartItemsEl.appendChild(li);
  });

  totalEl.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}
function payNow() {
  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (total === 0) {
    alert("Cart is empty!");
    return;
  }

  const options = {
    key: "rzp_test_yourKeyHere", // Replace with your Razorpay Test Key ID
    amount: total * 100, // Razorpay expects amount in paise
    currency: "INR",
    name: "Ayodhya Fashions",
    description: "Order Payment",
    image: "https://via.placeholder.com/100x100?text=Logo",
    handler: function (response) {
      alert("Payment Successful! ID: " + response.razorpay_payment_id);
      cart = [];
      updateCart();
    },
    prefill: {
      name: "Customer Name",
      email: "email@example.com",
      contact: "9999999999"
    },
    theme: {
      color: "#e91e63"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
