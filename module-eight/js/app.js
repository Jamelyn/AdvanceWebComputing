<<<<<<< HEAD
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
=======
$(document).ready(function() {
    var app = {};
    var url = '';
>>>>>>> b4ecc663bd4712a1c5ef602db05a3278245a7619
	
	url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?';
	sendRequest(url);

	$('#box_office').click(function(){
		url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?';
		sendRequest(url);
	});
		
	$('#in_theaters').click(function(){
		url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?';
		sendRequest(url);
		//alert(url);
	});

	$('#up_coming').click(function(){
		url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?';
		sendRequest(url);
		//alert(url);
	});

	$('#opening_movies').click(function(){
		url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?';
		sendRequest(url);
		//alert(url);
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
