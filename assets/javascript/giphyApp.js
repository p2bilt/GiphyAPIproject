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
    // 
    resetForm($('#feels-form'));

});


$(document).on('click', '.search-feels', function() {
    searchClick = $(this).attr("name");
    console.log(searchClick);
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchClick + "&api_key=dc6zaTOxFJmzC&limit=10";
    $('#gifs-appear-here').empty();
    searchfeels();

});

// Calling the renderButtons function to display the initial list of feelses
renderButtons();


function searchfeels() {

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        console.log(queryURL);
        console.log(response);

        var results = response.data;
        $("#gifs-appear-here").removeClass( "card-deck" ).addClass( "card-columns" );

        for (var i = 0; i < results.length; i++) {


            // var feelsDiv = $("<div>");
            // var p = $("<p>");

            // p.text("Rating: " + results[i].rating);

            // var feelsImage = $("<img>");
            // feelsImage.attr("src", results[i].images.fixed_height_still.url);
            // feelsImage.attr("data-animate", results[i].images.fixed_height.url);
            // feelsImage.attr("data-still", results[i].images.fixed_height_still.url);
            // feelsImage.attr("data-state", "still");
            // feelsImage.attr("class", "gif");

            // feelsDiv.append(p);
            // feelsDiv.append(feelsImage);

            // $("#gifs-appear-here").prepend(feelsDiv);

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



$(document).on('click', '.gif', function() {
    // STEP ONE: study the html.
    // Look at all the data attributes.
    // Run the file in the browser. Look at the images.

    // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

    // STEP TWO: make a variable named state and then store the image's data-state into it.
    // Use the .attr() method for this.

    // ============== FILL IN CODE HERE FOR STEP TWO =========================

    var state = $(this).attr("data-state");
    var anim = $(this).attr("data-animate");
    var stil = $(this).attr("data-still");


    // CODE GOES HERE

    // =============================================

    // STEP THREE: Check if the variable state is equal to 'still',
    // then update the src attribute of this image to it's data-animate value,
    // and update the data-state attribute to 'animate'.

    // If state is equal to 'animate', then update the src attribute of this
    // image to it's data-still value and update the data-state attribute to 'still'
    // ============== FILL IN CODE HERE FOR STEP THREE =========================

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


    // CODE GOES HERE

    // ==============================================

    // STEP FOUR: open the file in the browser and click on the images.
    // Then click again to pause.
});
