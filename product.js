function addToCart(id, name, price, image, size, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.id === id && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price), // Convert price to a number
            size: size,
            quantity: quantity,
            image: image
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Cart Updated:", localStorage.getItem("cart")); // Debugging
    alert(`${name} (Size: ${size}) added to cart!`);
}
