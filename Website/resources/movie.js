$('form').submit(function(event) {
    // Stop the form from submitting
    event.preventDefault();
  
    // Get The value from the form
    var movieName = $('#search').val();
    var movieURL = "https://www.omdbapi.com/?t="+movieName;
  
    var movieOptions = {
      s: "",
  
    };
  
    function displayMovies(data) {
    console.log(data);
     /* var movieHTML = '<ul>';
      $.each(data.items, function(index, value) {
        movieHTML += '<li>';
        movieHTML += '<img ';
        movieHTML += 'src="' + value.Poster + '" ';
        movieHTML += 'alt="' + value.Title + '" >';
        movieHTML += '</li>';
      });//end each*/
      console.log(data.Title);
          var movieHTML = '<ul>';
        movieHTML += '<li>';
        movieHTML += '<img ';
        movieHTML += 'src="' + data.Poster + '" ';
        movieHTML += 'alt="' + data.Title + '" >';
        movieHTML += '</li>';
      
      movieHTML += '</ul>';
      $('#movieInformation').html(movieHTML);
  
    }
    $.getJSON(movieURL, movieOptions, displayMovies);// end getJSON
  
  }); // end submit function