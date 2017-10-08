// Figured out that this is the equivalent to $( document ).ready(function() {}
$(function () {
    // Add burger
    $(".create-form").on("submit", function (event) {
        // preventDefault on a submit event
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burger_name").val().trim()
        };

        // POST to add burger
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("added new burger");
                
                location.reload();
            }
        );
    });

    $(".eatIt").on("click", function (event) {
        var id = $(this).data("id");

        // Update burger.
        $.ajax("/api/burgers/" + id, {
            type: "PUT"
        }).then(
            function () {
                console.log("ate the burger ", id);
                
                location.reload();
            }
        );
    });
});
