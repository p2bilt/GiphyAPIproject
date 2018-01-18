// Initial array of feelses
var feelses = ["Happy", "Sad", "Angry", "Awkward", "Bored", "Confused", "Excited", "Frustrated", "Hungry", "Mind Blown"];

var queryURL, searchClick;

// Function for displaying feels data
function renderButtons() {

    // Delete the content inside the feelses-view div prior to adding new feels, avoiding duplicate buttons

    $("#buttonSet").empty();

    // Loop through the array of feels, then generate buttons for each feels in the array

    for (i = 0; i < feelses.length; i++) {
        var currentfeels = feelses[i];
        var buttonBunch = $('<input/>').attr({ type: 'button', class: 'search-feels btn btn-info', name: currentfeels, value: currentfeels });
        $("#buttonSet").append(buttonBunch);
    }

}

// reset the form
function resetForm($form) {
    $form.find('input:text').val('');

}


// This function handles events where the add feels button is clicked
$("#add-feels").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    var feels = $("#feels-input").val().trim();
    // Write code to add the new feels into the feelses array
    feelses.push(feels);
    // The renderButtons function is called, rendering the list of feels buttons
    renderButtons();
    // reset that form
    resetForm($('#feels-form'));

});

// when click on one of the feelings buttons, perform search
$(document).on('click', '.search-feels', function() {
    // grab the attribute name of our button 
    searchClick = $(this).attr("name");
    // drop that attribute name into our query URL 
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchClick + "&api_key=dc6zaTOxFJmzC&limit=10";
    // empty our div where gifs appear (the bootstrap cards-column feature we're using has awkward results if we just keep piling on the gifs)
    $('#gifs-appear-here').empty();
    // trigger the search for gifs.
    searchfeels();

});

// Calling the renderButtons function to display the initial list of feelses
renderButtons();

// giphy search and results build
function searchfeels() {
    // trigger the giphy search
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        //  store response in a variable
        var results = response.data;
        // swop out the class for area where gifs appear (for formatting)
        $("#gifs-appear-here").removeClass("card-deck").addClass("card-columns");
        // cycle thru results of giphy search and generate bootstrap cards with giphy results in them
        for (var i = 0; i < results.length; i++) {
            // i know this is ugly.
            $('#gifs-appear-here').prepend('<div class="card ">' +
                '<h3 class="card-header">' + searchClick + '</h3>' +
                '<img src ="' + results[i].images.fixed_height_still.url + '" data-animate="' + results[i].images.fixed_height.url +
                '" data-still="' + results[i].images.fixed_height_still.url + '" data-state="still" class="gif card-img-top img-fluid">' +
                '<div class="card-body">' +
                '<p class="card-text">' + results[i].title + '</div>' +
                '<div class="card-footer text-muted">' + "Rating: " + results[i].rating +
                '</div>' + '</div>' + '</div>'

            );
        }
    });
}


// function which reacts to a gif-click by swopping out its state and source, such that it will animage or still
$(document).on('click', '.gif', function() {
    // a variable named state and store the image's data-state into it.

    var state = $(this).attr("data-state");
    var anim = $(this).attr("data-animate");
    var stil = $(this).attr("data-still");
    // Check if the variable state is equal to 'still', then update the src attribute of this image to it's data-animate value,
    // and update the data-state attribute to 'animate'.
    // If state is equal to 'animate', then update the src attribute image to it's data-still value and update the data-state attribute to 'still'

    if (state == "still") {
        console.log("animate triggered");
        $(this).attr("src", anim);
        $(this).attr("data-state", "animate");

    } else if (state == "animate")

    {
        console.log("still triggered");
        $(this).attr("src", stil);
        $(this).attr("data-state", "still");
    };

    // BETTER YET FOR THE ANIM SRC Change - kill those last two variables, 
    // and in the if/else: 
    // $(this).attr("src", $(this).attr("data-animate"));
});
