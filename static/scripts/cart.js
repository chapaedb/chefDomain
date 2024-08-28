document.addEventListener("DOMContentLoaded", function () {
  const cartSection = document.querySelector(".cart-content");
  const totalPriceLabel = document.querySelector(".total-price"); // Assuming you have a label to display the total price

  const updateCartUI = function (items) {
    cartSection.innerHTML = ""; // Clear cart UI before rendering
    let totalPrice = 0;

    items.forEach((item) => {
      const price = parseFloat(item.price.split("N")[1].replace(",", "")); // Assuming the price is in the format 'N1000'
      const subtotal = price * item.quantity;
      totalPrice += subtotal;

      const html = `
        <tr class="cart-item">
          <td><a href="#" class="remove-item"><i class="far fa-times-circle"></i></a></td>
          <td><img src=${item.image} alt=""></td>
          <td class="product-name">${item.productName}</td>
          <td>${item.price}</td>
          <td><input type="number" class="price-change" min="1" value=${item.quantity}></td>
          <td>N${subtotal.toFixed(2)}</td>
        </tr>
      `;

      cartSection.insertAdjacentHTML("beforeend", html);
    });

    // Display the total price
    totalPriceLabel.textContent = `Total: N${totalPrice.toFixed(2)}`;

    // Attach event listeners for quantity change
    document.querySelectorAll(".price-change").forEach((input) => {
      input.addEventListener("change", handleQuantityChange);
    });

    // Attach event listeners for item removal
    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", handleRemoveItem);
    });
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    const productName = e.target.closest(".cart-item").querySelector(".product-name").textContent;

    const parsedItem = JSON.parse(localStorage.getItem("userCart"));
    const itemToUpdate = parsedItem.find((item) => item.productName === productName);

    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
      localStorage.setItem("userCart", JSON.stringify(parsedItem));
      updateCartUI(parsedItem);
    }
  };

  const handleRemoveItem = (e) => {
    e.preventDefault();
    const productName = e.target.closest(".cart-item").querySelector(".product-name").textContent;

    const parsedItem = JSON.parse(localStorage.getItem("userCart"));
    const updatedCart = parsedItem.filter((item) => item.productName !== productName);

    localStorage.setItem("userCart", JSON.stringify(updatedCart));
    updateCartUI(updatedCart);

    if (updatedCart.length === 0) {
      localStorage.removeItem("userCart");
      showEmptyCartMessage();
    }
  };

  const showEmptyCartMessage = () => {
    document.querySelector(".cart-table").innerHTML = "";
    const createEl = document.createElement("h3");
    createEl.classList.add("empty-cart");
    createEl.textContent = "Your Cart Is Empty";
    document.querySelector(".section-p").insertAdjacentElement("beforebegin", createEl);
  };

  if (localStorage.getItem("userCart")) {
    const parsedItem = JSON.parse(localStorage.getItem("userCart"));
    updateCartUI(parsedItem);
  } else {
    showEmptyCartMessage();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateTotalPrice();

  function updateTotalPrice() {
      const cartItems = document.querySelectorAll('.cart-content tr');
      let totalPrice = 0;

      cartItems.forEach(item => {
          const priceElement = item.querySelector('td:nth-child(4)').innerText.replace(/[^0-9.-]+/g,""); // Remove currency symbols and commas
          const quantityElement = item.querySelector('input[type="number"]').value;
          const itemTotal = parseFloat(priceElement) * parseInt(quantityElement, 10);

          totalPrice += itemTotal;
      });

      // Update total price elements
      document.querySelector('.total-price').innerText = `N${totalPrice.toFixed(2)}`;
  }

  // Update the total price when quantity changes
  document.querySelectorAll('.cart-content input[type="number"]').forEach(input => {
      input.addEventListener('change', updateTotalPrice);
  });
});
