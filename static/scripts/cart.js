const cartSection = document.querySelector(".cart-content");
cartSection.innerHTML = "";

const parsedItem = JSON.parse(localStorage.getItem("userCart"));

document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("userCart")) {
    document.querySelector(".cart-table").innerHTML = "";

    const createEl = document.createElement("h3");
    createEl.classList.add("empty-cart");
    createEl.textContent = "Your Cart Is Empty";

    document
      .querySelector(".section-p")
      .insertAdjacentElement("beforebegin", createEl);
  } else {
    const updateCartUI = function (obj) {
      cartSection.innerHTML = "";

      obj.forEach((item) => {
        cartSection.innerHTML = "";

        const helperFunction = (item) => {
          const quantity = [
            item.quantity.padStart(2, 0) + item.price.split("N")[1],
          ];
          const t = quantity.map((b) => {
            const z = [];
            const u = b.slice(0, 2);
            const y = b.slice(2, b.length);
            z.push(u, y);

            return z;
          });

          const a = t[0];
          const [b, c] = a;
          const e = [];

          e.push(c.split(",").join(""), b.startsWith("0") ? b.slice(1) : b);

          const f = e.reduce((acc, curr) => {
            return acc * Number(curr);
          }, 1);

          return f;
        };

        const updatedSubtotal = helperFunction(item);

        const html = `
              <tr class="cart-item">
              <td><a href="#" class="remove-item"><i class="far fa-times-circle"></i></a></td>
              <td><img src=${item.image} alt=""></td>
              <td class="product-name">${item.productName}</td>
              <td>${item.price}</td>
              <td><input type="number" class="price-change" min="1" value=${item.quantity}></td>
              <td>N${updatedSubtotal}</td>
              </tr>
              `;

        cartSection.insertAdjacentHTML("beforebegin", html);
      });
    };

    updateCartUI(parsedItem);

    console.log(parsedItem);

    document.querySelectorAll(".price-change").forEach((input) => {
      input.addEventListener("change", (e) => {
        const clicked = e.target.value;
        const clickedNode =
          e.target.closest(".cart-item").children[2].textContent;

        const findItemInLocalStorage = parsedItem.find(
          (item) => item.productName === clickedNode
        );

        if (!findItemInLocalStorage) return;

        const updatedQuantity = (findItemInLocalStorage.quantity = clicked);

        findItemInLocalStorage.quantity = updatedQuantity;

        localStorage.setItem("userCart", JSON.stringify(parsedItem));

        const updatedLocalStorage = JSON.parse(
          localStorage.getItem("userCart")
        );

        updateCartUI(updatedLocalStorage);
        location.reload();
      });
    });

    const removeItemFromCart = document.querySelectorAll(".remove-item");

    const removeItemFromCartBtnPressed = function (e) {
      e.preventDefault();

      const clicked = e.target;

      const itemToRemove = clicked
        .closest(".cart-item")
        .querySelector(".product-name").textContent;

      const findItemInLocalStorage = parsedItem.find(
        (item) => item.productName === itemToRemove
      );

      if (!findItemInLocalStorage) return;

      parsedItem.splice(parsedItem.indexOf(findItemInLocalStorage), 1);

      localStorage.setItem("userCart", JSON.stringify(parsedItem));
      updateCartUI(parsedItem);

      if (parsedItem.length < "1") {
        localStorage.clear();
        location.reload();
      }

      location.reload();
    };

    removeItemFromCart.forEach((btn) => {
      btn.addEventListener("click", removeItemFromCartBtnPressed);
    });
  }
});
