// Delivery Estimator
function calculateDelivery(event) {

    // Prevent the page from reloading
    event.preventDefault();

    // Clear previous error messages
    document.getElementById("customerNameError").textContent = "";
    document.getElementById("customerEmailError").textContent = "";
    document.getElementById("destinationError").textContent = "";
    document.getElementById("weightError").textContent = "";
    document.getElementById("deliverySpeedError").textContent = "";

    // Get customer information
    const customerName = document.getElementById("customerName").value.trim();
    const customerEmail = document.getElementById("customerEmail").value.trim();

    // Get delivery information
    const destination = document.getElementById("destination").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const deliverySpeed = document.getElementById("deliverySpeed").value;

    // Validation flag
    let isValid = true;

    // Validate customer name
    if (customerName === "") {
        document.getElementById("customerNameError").textContent =
            "Please enter your name.";

        isValid = false;
    }

    // Validate email
    if (customerEmail === "") {

        document.getElementById("customerEmailError").textContent =
            "Please enter your email address.";

        isValid = false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {

        document.getElementById("customerEmailError").textContent =
            "Please enter a valid email address.";

        isValid = false;
    }

    // Validate destination
    if (destination === "") {
        document.getElementById("destinationError").textContent =
            "Please select a delivery destination.";

        isValid = false;
    }

    // Validate weight
    if (document.getElementById("weight").value.trim() === "") {

        document.getElementById("weightError").textContent =
            "Please enter the parcel weight.";

        isValid = false;

    } else if (!Number.isFinite(weight) || weight < 0.1) {
        document.getElementById("weightError").textContent =
        "Parcel weight must be at least 0.1 kg.";
        isValid = false;
    }

    // Validate delivery speed
    if (deliverySpeed === "") {
        document.getElementById("deliverySpeedError").textContent =
            "Please select a delivery speed.";

        isValid = false;
    }

    // Stop if the form is invalid
    if (!isValid) {
        document.getElementById("resultSection").classList.add("d-none");
        return;
    }

    // Determine destination charge
    let baseCharge = 0;

    if (destination === "local") {
        baseCharge = 5;
    } else if (destination === "west") {
        baseCharge = 10;
    } else if (destination === "east") {
        baseCharge = 18;
    }

    // Calculate additional weight charge
    let weightCharge = 0;

    if (weight > 1) {
        weightCharge = Math.ceil(weight - 1) * 3;
    }

    // Determine delivery speed surcharge
    let speedCharge = 0;

    if (deliverySpeed === "express") {
        speedCharge = 8;
    }

    // Calculate total delivery charge
    const totalCharge = baseCharge + weightCharge + speedCharge;

    // Display the estimation result
    document.getElementById("resultMessage").textContent =
        "Thank you, " + customerName + "! Here is your estimated delivery cost.";

    document.getElementById("baseCharge").textContent =
        baseCharge.toFixed(2);

    document.getElementById("weightCharge").textContent =
        weightCharge.toFixed(2);

    document.getElementById("speedCharge").textContent =
        speedCharge.toFixed(2);

    document.getElementById("totalCharge").textContent =
        totalCharge.toFixed(2);

    // Show the result section
    document.getElementById("resultSection").classList.remove("d-none");
}

// Connect the form to the calculation function
const deliveryForm = document.getElementById("deliveryForm");

if (deliveryForm) {
    deliveryForm.addEventListener("submit", calculateDelivery);
}
