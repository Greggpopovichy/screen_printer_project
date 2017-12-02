$(document).ready(function() {

    $("#placeorder").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newUserOrder = {
            size: $("#size").val().trim(),
            shirt_type: $("#typeShirt").val().trim(),
            material: $("#material").val().trim(),
            color: $("#color").val().trim(),
            notes: $("#notes").val().trim()
        };

        console.log(newUserOrder);

        // Send the POST request.
        $.ajax("/", {
            type: "POST",
            data: newUserOrder
        }).then(function () {
                //this should log to browser console to let us know that the database has been updated
                console.log("created new order");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});


