// App.js

// SELECT ELEMENTS :

const productsEl = document.querySelector('.list');
const cartItemsEl = document.querySelector('.listCart');
const subTotalEl = document.querySelector('.subtotal');
const totalItemsInCartEl = document.querySelector('.total-items-in-cart');
const checkoutEl = document.querySelector('.checkout');
// const logoEl = document.querySelector('.name');




// RENDER PRODUCTS :

function renderProducts() {
    products.forEach((products) => {
        productsEl.innerHTML += `
            <div class="item" data-key="1">
                <div class="img">
                    <img src="${products.imgSrc}" alt="${products.name}">
                </div>
                <div class="content">
                    <div class="title">${products.name}</div>
                    <div class="des">${products.description}</div>
                    <div class="price">Rs ${products.price}</div>
                    <button class="add" onClick="addToCart(${products.id})">Add to cart</button>
                </div>
            </div>
        `
    });
}
renderProducts();


// CART ARRAY :

// let cart = [];
let cart = JSON.parse(localStorage.getItem('CART')) || [];
updateCart();


// ADD TO CART :

function addToCart(id) {
    // console.log(id);

    // Check if the product already exists in cart :
    if (cart.some((item) => item.id === id)) {
        // alert('Product is already in cart!');
        changeNoOfUnits('plus', id);
    }

    else {
        const item = products.find((product) => product.id === id);
        console.log(item);
        cart.push({
            ...item,
            numberOfUnits: 1,
        });
        // console.log(cart);
    }
    
    updateCart();
}


// UPDATE CART :

function updateCart() {
    renderCartItems();
    renderSubTotal();


    // SAVE CART TO LOCAL STORAGE :

    localStorage.setItem('CART', JSON.stringify(cart));
}


// CALCULATE AND RENDER SUBTOTAL :

function renderSubTotal() {
    let totalPrice = 0, totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subTotalEl.innerHTML = ` Subtotal (${totalItems} items): ₹ ${totalPrice}` // .toFixed(2) -> is used to show only 2 numbers after decimal point (29.22)

    totalItemsInCartEl.innerHTML = totalItems;
}

// RENDER CART ITEMS :

function renderCartItems() {

    cartItemsEl.innerHTML = ""; // CLEAR CART ELEMENTS
    cart.forEach((item) => {

        cartItemsEl.innerHTML += `
            <div class="item" data-key="1">
                    <div class="img">
                            <img src="${item.imgSrc}" alt="${item.name}">
                    </div>
                    <div class="content">
                            <div class="title">${item.name}</div>
                            <div class="des">${item.description}</div>
                            <div class="price">Rs ${item.price}</div>
                            <button class="remove" onClick="removeItemFromCart(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
                            <button class="btn minus" onClick="changeNoOfUnits('minus', ${item.id})">-</button>
                            <button class="number">${item.numberOfUnits}</button>
                            <button class="btn plus" onClick="changeNoOfUnits('plus', ${item.id})">+</button>
                    </div>
                </div>
        `;
    });
    
}


// REMOVE ITEMS FROM CART :

function removeItemFromCart(id) {
    cart = cart.filter ((item) => item.id !== id);

    updateCart();
}


// CHANGE NUMBER OF UNITS FOR AN ITEM :

function changeNoOfUnits(action, id) {
    cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits; // oldNoOfUnits = ...
        if (item.id === id) {
            if (action === 'minus' && numberOfUnits > 1) {
                numberOfUnits--  // oldNoOfUnits = ...
            } 

            else if (action === 'plus' && numberOfUnits < item.instock) {
                numberOfUnits++  // oldNoOfUnits = ...
            }
        }
        return {
            ...item,
            numberOfUnits: numberOfUnits, // oldNoOfUnits = ...
        };
    });

    updateCart();
}


