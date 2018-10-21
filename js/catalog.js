/* global Product, Cart */

'use strict';


var linkTag = document.createElement('link');
linkTag.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');
linkTag.setAttribute('rel', 'stylesheet');
document.getElementsByTagName('head')['0'].appendChild(linkTag);
console.log(document.getElementsByTagName('head')['0']);


var submitCSSAnimation = document.createElement('div');
var cardFormDIV = document.getElementsByClassName('card')['1'];
submitCSSAnimation.textContent = 'Item Added To Cart';
submitCSSAnimation.setAttribute('id', 'display-none');
console.log('SUBMIT CSS AN',submitCSSAnimation);
cardFormDIV.appendChild(submitCSSAnimation);



// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var productOptions = document.createElement('option');
    productOptions.value= Product.allProducts[i].name;
    productOptions.textContent = Product.allProducts[i].name;
    selectElement.appendChild(productOptions);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.

// TODO: Prevent the page from reloading
// event.stopPropagation();
// Do all the things ...

function handleSubmit(event) {
  event.preventDefault();
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
  renderCSSAnimation();

}

// TODO: Add the selected item and quantity to the cart
// TODO: suss out the item picked from the select list
// TODO: get the quantity
function addSelectedItemToCart() {
  var selectedItem = event.target.items.value;
  var selectedQuantity = event.target.quantity.value;
  
  // TODO: using those, add one item to the Cart
  console.log(selectedItem, selectedQuantity);
  var currentItem = new CartItem(selectedItem, selectedQuantity);
  cart.items.push(currentItem);
  console.log(cart);
}
// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var cartCount = document.getElementById('itemCount');
  cartCount.textContent = cart.items.length;
}

var cartContainer =document.getElementById('cartContents');
var cartUL = document.createElement('ul');
cartUL.textContent = 'Cart Preview';
cartContainer.appendChild(cartUL);


// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
// TODO: Get the item and quantity from the form
// TODO: Add a new element to the cartContents div with that information
// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process

function updateCartPreview() {
  var selectedCartItem = event.target.items.value;
  var selectedCartQuantity = event.target.quantity.value;
  var cartLI = document.createElement('li');
  cartLI.textContent = `item(s): ${selectedCartItem} quantity: ${selectedCartQuantity}`;
  cartUL.appendChild(cartLI);
}
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);
 
if (localStorage.cart) {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(cartItems);
  for (var i = 0; i < cartItems.length; i++) {
    var cartLI = document.createElement('li');
    cartLI.textContent = `item(s): ${cartItems[i].product} quantity: ${cartItems[i].quantity}`;
    cartUL.appendChild(cartLI);
  }
}
function addingDisplayNone () {
  var addingBackAnimation;
  addingBackAnimation = submitCSSAnimation.setAttribute('id','display-none');
}

function renderCSSAnimation(){
  submitCSSAnimation.setAttribute('id', '');
  // submitCSSAnimation.setAttribute('class', 'bounceInUp');
  console.log('hitting renderCSS ANIMATION');
  setInterval(function(){
    submitCSSAnimation.setAttribute('id','display-none');
  },1000);
}

var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
