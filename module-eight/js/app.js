$(function(){
	$('#movie_text').keypress(function(event) {
		
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13') {
			var movie_title =  $("#movie_text").val();
				if (txtTitle.value == ""){
					alert("Please insert a Movie Title.");
				}
				else{
					alert(movie_title);
				}
			$('#movie_text').val('');
		}
	});
});

	$("#boxOffice").click(function(){
		//sendRequest('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?');
		alert("box_office");
	});
	
	$("#upComing").click(function(){
		//nfunction()Request('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?');
		alert("upComing");
	});
	
	$("#inTheaters").click(function(){
		//sendRequest('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?');
		alert("inTheaters");
	});
	
	$("#openingMovies").click(function(){
		//sendRequest('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?');	
		alert("openingMovies");
	});


	function pagination(total_movies){
		var total_movies;
		var total_pages;
		total_pages = total_movies / 50;
		return total_pages;
		//
	};

	function sendRequest(server_url, movie){
		var server_url;
		var movie;
		$.ajax({
			url: server_url,
			dataType: "jsonp",
			data: {
				q: movie_title,
				apiKey: 'hcrurhsttexasrgfm2y6yahm',
				page_limit: 50
			},
			success: showMovies
		});
	};

	function showMovies(response){
	};
