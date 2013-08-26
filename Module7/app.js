$(document).ready(function(){

	$('#txtTitle').keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13') {
			var movie_title =  $("#txtTitle").val();
			searchMovies(movie_title);
				if (txtTitle.value == ""){
					alert("Please insert a Movie Title.");
				}
			$('#txtTitle').val('');
		}
	});
	/*
	var pageStatus = 1;

	function Next(){
		pageStatus + 1;
	}

	function Prev(){
		pageStatus - 1;
	}
	*/
	$("#button").click(function(){
		var movie_title =  $("#txtTitle").val();
		searchMovies(movie_title);
	});
	
	function searchMovies(movie_title){
		$('.main').replaceWith($('<div class="main"></div>'));
		console.log(movie_title)
		var server = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json'
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data:{
				q: movie_title,
				apiKey: 'hcrurhsttexasrgfm2y6yahm', page_limit: 50, page: 1
			},
			success:showMovies
		});	
	}

	function showMovies(response){
		
		console.log('response', response);
		var movies = response.movies;
		$('.main').append("<div id='movie_count'>--Showing <span>" + movies.length + "</span>  Movie results--</div>");
		for(var i = 0; i < movies.length; i++){
			var movie = movies[i];
			$('.main').append("<div class='movie_container'><h2>" + movie.title + " (" + movie.year + ") </h2> <br><img src='" + movie.posters.thumbnail + "'/> <div id='movieDescription'> <b>Synopsis: </b> <div id='description'>" + movie.synopsis + " </div><br><b>Rated: </b> <div id='description'>" + movie.mpaa_rating + " </div><br><b>In Theaters: </b><div id='description'>" + movie.release_dates.theater + " </div><br><b>Critics Rating: </b><div id='description'>" + movie.ratings.critics_rating + " </div><br><b>Audience Rating: </b><div id='description'>" + movie.ratings.audience_rating + "</div> </div> </div>");
		}
	}
});

