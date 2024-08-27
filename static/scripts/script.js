const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')




if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}
/*
//Image slider script for shop page
var MainImg = document.getElementById('Mainimage')
var smallimg = document.getElementsByClassName('small-img')

smallimg[0].onclick = function(){
    MainImg.src = smallimg[0].src;
}

smallimg[1].onclick = function(){
    MainImg.src = smallimg[1].src;
}

smallimg[2].onclick = function(){
    MainImg.src = smallimg[2].src;
}

smallimg[3].onclick = function(){
    MainImg.src = smallimg[3].src;
}
*/

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const productId = button.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
});

function addToCart(productId) {
    // Call your function to add the item to the cart
    // For demonstration purposes, I'll just call showCustomAlert here
    showCustomAlert('Item added to cart successfully');
}

function showCustomAlert(message) {
    const customAlert = document.getElementById('custom-alert');
    const customAlertMessage = document.getElementById('custom-alert-message');
    customAlertMessage.innerText = message;
    customAlert.style.display = 'block';

    setTimeout(function() {
        customAlert.style.display = 'none';
    }, 800); // 3 seconds
}

// For cart interaction
const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

const addToCartBtnPressed = function (e) {
  e.preventDefault();

  let existing = localStorage.getItem("userCart");

  existing = existing ? JSON.parse(existing) : [];
  const currentShopping = {};
  const clickedBtn = e.target.closest(".product");
  currentShopping.image = clickedBtn.querySelector("img").getAttribute("src");
  currentShopping.productName = clickedBtn.querySelector("h5").textContent;
  currentShopping.price = clickedBtn.querySelector("h4").textContent;
  currentShopping.quantity = "1";
  currentShopping.priceSubtotal = clickedBtn
    .querySelector("h4")
    .textContent.split("N")[1];
  currentShopping.loggedIn = false;
  existing.push(currentShopping);
  localStorage.setItem("userCart", JSON.stringify(existing));
};

addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", addToCartBtnPressed);
});