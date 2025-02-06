document.addEventListener("DOMContentLoaded", function () {
    console.log("Cart.js Loaded. Retrieving cart...");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart Data from LocalStorage:", cart);

    if (!cart.length) {
        console.warn("Cart is empty!");
    }

    loadCart();
});

// Function to load the cart and display items
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart Contents:", cart);

    const cartTable = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");
    const checkoutButton = document.getElementById("checkout-button");

    if (!cartTable) {
        console.error("Error: cart-items table body is missing in cart.html");
        return;
    }

    cartTable.innerHTML = ""; // Clear previous cart display

    if (cart.length === 0) {
        cartTable.innerHTML = `<tr><td colspan="5" style="text-align:center;">Your cart is empty</td></tr>`;
        subtotalElement.textContent = "RM0.00";
        taxElement.textContent = "RM0.00";
        totalElement.textContent = "RM0.00";
        checkoutButton.disabled = true; // Disable checkout if cart is empty
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        let itemPrice = parseFloat(item.price); // Convert price to number
        let totalPrice = itemPrice * item.quantity;
        subtotal += totalPrice;

        let row = `
            <tr>
                <td><img src="${item.image}" style="width:50px;height:50px;"> ${item.name} (Size: ${item.size})</td>
                <td>RM${itemPrice.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="cart-quantity">
                </td>
                <td>RM${totalPrice.toFixed(2)}</td>
                <td><button class="remove-item" data-index="${index}">X</button></td>
            </tr>
        `;
        cartTable.innerHTML += row;
    });

    let tax = subtotal * 0.06; // 6% Tax
    let total = subtotal + tax;

    subtotalElement.textContent = `RM${subtotal.toFixed(2)}`;
    taxElement.textContent = `RM${tax.toFixed(2)}`;
    totalElement.textContent = `RM${total.toFixed(2)}`;

    // Enable checkout button when items are available
    checkoutButton.disabled = false;

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        });
    });

    document.querySelectorAll(".cart-quantity").forEach(input => {
        input.addEventListener("change", function () {
            let index = this.getAttribute("data-index");
            let newQuantity = parseInt(this.value);
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                loadCart();
            }
        });
    });

    console.log("Cart Loaded Successfully!");
}

// Checkout button event listener
document.getElementById("checkout-button").addEventListener("click", function () {
    window.location.href = "checkout.html";
});
