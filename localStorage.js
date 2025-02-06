document.addEventListener("DOMContentLoaded", function () {
    const profileLink = document.querySelector("a[href='profile.html']").parentElement;
    const signUpLink = document.querySelector("a[href='signup.html']").parentElement;
    const signInLink = document.querySelector("a[href='signin.html']").parentElement;
  
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    
  
    if (isLoggedIn === "true") {
      // Show Profile, hide Sign Up and Sign In
      profileLink.style.display = "block";
      signUpLink.style.display = "none";
      signInLink.style.display = "none";
    } else {
      // Hide Profile, show Sign Up and Sign In
      profileLink.style.display = "none";
      signUpLink.style.display = "block";
      signInLink.style.display = "block";
    }


    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", function () {
          // Save current user data before logout
          let currentUser = JSON.parse(localStorage.getItem("currentUser"));
          if (currentUser) {
              let customers = JSON.parse(localStorage.getItem("customers")) || [];
              let existingUserIndex = customers.findIndex(user => user.email === currentUser.email);
              if (existingUserIndex !== -1) {
                  customers[existingUserIndex] = currentUser; // Update user data
              } else {
                  customers.push(currentUser); // Add if not found
              }
              localStorage.setItem("customers", JSON.stringify(customers));
          }

          // Clear session data but keep customers stored
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("currentUser");

          alert("You have been logged out.");
          window.location.href = "index.html";
        });
    }
   
});


