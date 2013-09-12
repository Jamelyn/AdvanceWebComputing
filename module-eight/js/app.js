$(document).ready(function() {
    var app = {};
    var url = '';

    $('#movie-text').keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13') {
			var movie_title =  $("#movie-text").val();
			searchMovies(movie_title);
				if (movie_title.value == ""){
					alert("Please insert a Movie Title.");
				}
				else{

					$.ajax({
					url: 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?',
					dataType: 'jsonp',
					data:{
						q: movie_title,
						apiKey: 'hcrurhsttexasrgfm2y6yahm', page_limit: 50, page: 1
					},
					success:showMovies

					});
					$('#movie-text').val('');
					
				}
			
		}
	});
	
	url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?';
	sendRequest(url);

	$('#box_office').click(function(){
		url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?';
		sendRequest(url);
	});
		
	$('#in_theaters').click(function(){
		url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?';
		sendRequest(url);
	});

	$('#up_coming').click(function(){
		url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?';
		sendRequest(url);
	});

	$('#opening_movies').click(function(){
		url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?';
		sendRequest(url);
	});

 	function sendRequest(url){
 	
	 $.ajax({
	        url: url,
	        data: {
	            apiKey: 'hcrurhsttexasrgfm2y6yahm'
	        },
	        dataType: 'jsonp',
	        success: showBoxOffice
  	  });
 	}
    
    function getTemplate(template_id, context) {
        var template, $template, markup;
        template = $('#' + template_id);
        $template = Handlebars.compile(template.html());
        markup = $template(context);
        return markup;

    }
    function showBoxOffice(response) {
    	$('ul.movie-list').replaceWith('<ul class="thumbnails movie-list"></ul>');
        app.movies = response.movies;
        var movie, template, $template, markup;
        for (var i = 0; i < app.movies.length; i++) {
                movie = app.movies[i];
                movie._index = i;
                $('ul.movie-list').append(getTemplate('tpl-box-office-item', movie));
        }

        $('div .caption').hover(function(ev) {
            var data = $(ev.target).closest('li').data();
            var movie = app.movies[data.id];
            $('.movie-detail').html(getTemplate('tpl-movie-detail', movie));
        });
    }
});