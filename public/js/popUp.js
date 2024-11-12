const confirmDelete = function (event) {
    // Display a confirmation dialog
    let userResponse = confirm("Are you sure you want to delete this item?");

    // Handle user response
    if (!userResponse) {
        // User canceled the delete operation, prevent the default action
        event.preventDefault();
        console.log("Delete operation canceled.");
        return false;
    } else {
        // Perform delete operation
        console.log("Item deleted.");
        return true;
        // You can replace the above line with the actual delete code
    }
}

// Example usage
// document.getElementById("deleteButton").addEventListener("click", confirmDelete);
