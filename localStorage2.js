// Ensure customers array exists in localStorage
function saveUserDataToLocalStorage(user) {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    

    // Check if the user already exists in the array
    let existingUserIndex = customers.findIndex(c => c.email === user.email);

    if (existingUserIndex === -1) {
        // Add new user if not already in list
        customers.push(user);
    } else {
        // Update existing user address without overwriting other users
        customers[existingUserIndex].address = user.address || customers[existingUserIndex].address;
        customers[existingUserIndex].orders = user.orders || customers[existingUserIndex].orders;
    }

    // Save updated customers array back to localStorage
    localStorage.setItem("customers", JSON.stringify(customers));
}

function saveOrder(userEmail, order) {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let userIndex = customers.findIndex(c => c.email === userEmail);

    if (userIndex !== -1) {
        customers[userIndex].orders = customers[userIndex].orders || []; // Ensure orders array exists
        customers[userIndex].orders.push(order); // Add new order
    } else {
        console.error("User not found!");
        return;
    }

    localStorage.setItem("customers", JSON.stringify(customers));
   
}

// Retrieve users for admin panel
function getAllCustomers() {
    return JSON.parse(localStorage.getItem("customers")) || [];
}

function updateOrderStatus(email, orderName, newStatus, element) {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let userIndex = customers.findIndex(c => c.email === email);

    if (userIndex !== -1) {
        let user = customers[userIndex];
        
        // Ensure orders exist
        if (!user.orders || user.orders.length === 0) {
            console.error("No orders found for user:", email);
            return;
        }

        let updated = false;
        user.orders.forEach(order => {
            // Compare order identifier (ensure unique match)
            if (order.items.map(item => item.name).join(", ") === orderName) {
                order.status = newStatus;
                updated = true;
            }
        });

        if (updated) {
            localStorage.setItem("customers", JSON.stringify(customers));
            displayOrders(); // Refresh UI
        } else {
            console.warn("Order not updated. Possible mismatch in orderName.");
        }
    } else {
        console.error("User not found in localStorage:", email);
    }
}



function getAllOrders() {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let allOrders = [];

    customers.forEach(customer => {
        if (customer.orders && customer.orders.length > 0) {
            customer.orders.forEach(order => {
                allOrders.push({
                    name: customer.address?.fullName || customer.name || "Unknown",
                    email: customer.email,
                    orderName: order.items.map(item => item.name).join(", "),
                    date: order.date,
                    total: order.total,
                    status: order.status || "Processing"
                });
            });
        }
    });

    return allOrders;
}


// Export functions (optional if using module system)
window.saveUserDataToLocalStorage = saveUserDataToLocalStorage;
window.saveOrder = saveOrder;
window.getAllCustomers = getAllCustomers;
window.getAllOrders = getAllOrders;
