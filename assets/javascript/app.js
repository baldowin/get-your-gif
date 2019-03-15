var topic = ["basketball","football","baseball","quidditch"];

function makeButtons(){
    $("#buttons").empty();
    topic.forEach(function(thing){
        newButton=$("<button>")
        newButton.addClass("topic");
        newButton.text(thing);
        $("#buttons").append(newButton)
    })
}

$("#buttons").on("click",".topic", function() {
    $("gifs").empty();
    var topic = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topic + "&api_key=mTWyY9DI6XFjzPVh7uxxDcsWozhIXbEs&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
          var newDiv = $("<div>");
          
          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var image = $("<img>");
          image.attr("src", results[i].images.fixed_height_still.url);
          image.attr("still", results[i].images.fixed_height_still.url);
          image.attr("moving", results[i].images.fixed_height.url);
          image.attr("state","still");
          image.addClass("topicGif");
          newDiv.prepend(p);
          newDiv.prepend(image);
          $("#gifs").prepend(newDiv);
        }
      });
  });
  $("#gifs").on("click",".topicGif",function(){
      var gif=$(this);
    if(gif.attr("state")==="still"){
        gif.attr("src",gif.attr("moving"));
        gif.attr("state","moving");
        console.log("a");
    }
    else{
        gif.attr("src",gif.attr("still"));
        gif.attr("state","still");
        console.log("b");
    }
  });
$("#add-topic").on("click",function(event){
    event.preventDefault();
    topic.push($("#topic-input").val().trim());
    $("#topic-input").val("");
    makeButtons();
});

  makeButtons();