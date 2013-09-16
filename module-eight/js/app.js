$(document).ready(function() {
    var app = {};
    var url = '';

    $('#movie-text').keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13') {
			var movie_title =  $("#movie-text").val();
				if(movie_title == ""){
					alert("Please insert a Movie Title.","");
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
	
	url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json?';
	sendRequest(url);

	$('#home').click(function(){
		url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json?';
		sendRequest(url);
	});

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

	$('#about').click(function(){
		window.open('http://jamelyn.github.io/AdvanceWebComputing/module-one')
		return false;
	});

 	function sendRequest(url){
 	
	 $.ajax({
	        url: url,
	        data: {
	            apiKey: 'hcrurhsttexasrgfm2y6yahm'
	        },
	        dataType: 'jsonp',
	        success: showMovies
  	  });
 	}
    
    function getTemplate(template_id, context) {
        var template, $template, markup;
        template = $('#' + template_id);
        $template = Handlebars.compile(template.html());
        markup = $template(context);
        return markup;

    }
    function showMovies(response) {
    	$('div.movie-list').replaceWith('<div class="thumbnails movie-list"></div>');
        app.movies = response.movies;
        var movie, template, $template, markup;
        for (var i = 0; i < app.movies.length; i++) {
                movie = app.movies[i];
                movie._index = i;
                $('div.movie-list').append(getTemplate('tpl-items', movie));
        }
    
        $('div.thumbnail-img').hover(function(ev) {
            var data = $(ev.target).closest('div').data();
            var movie = app.movies[data.id];
            $('#' + data.id).popover({
            	title: movie.title + ' -- ' + movie.year,
            	offset: 10,
            	placement: get_popover_placement,
            	content: getTemplate('tpl-movie-detail', movie)
            });
        });
    }

    function get_popover_placement(pop, dom_el) {
      var width = window.innerWidth;
      if (width<800) return 'bottom';
      var left_pos = $(dom_el).offset().left;
      if (width - left_pos > 600) return 'right';
      return 'left';
    }
});