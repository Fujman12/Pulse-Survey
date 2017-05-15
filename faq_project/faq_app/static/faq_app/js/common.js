$(function() {

		// $('button[style]').click(function(e) {
		// 	var Fields = $('.fields');
		// 	var ControlGroup = $('.control-group:first').css({"display": "block"});
		// 	$(ControlGroup.clone()).val('').appendTo(Fields);
		// });

		function check_input(){
			if ($('.answer-hidden-kind').val() != '1') {

				$("div.image-name-wrapper").hide();

			} else{

				$("div.image-name-wrapper").show();

			}
		}


		$('.edit-answer-mnu #text').addClass("active")
		$('.edit-answer-mnu #video').click(function() {

			$('body .edit-answer .edit-answer-mnu ul li').addClass("inactive").removeClass("active");
			$(this).addClass("active").removeClass("inactive");
			$('.edit-answer div[class^="edit-answer-content"] label.vasya').html('Video url:');
			$('.answer-hidden-kind').val('2');

			check_input();
		});
		$('.edit-answer-mnu #text').click(function() {

			$('body .edit-answer .edit-answer-mnu ul li').addClass("inactive").removeClass("active");
			$(this).addClass("active").removeClass("inactive");
			$('.edit-answer div[class^="edit-answer-content"] label.vasya').html('Text:');
			$('.answer-hidden-kind').val('0');

			//$(".text-input").val('');
			check_input();
		});
		$('.edit-answer-mnu #maps').click(function() {

			$('body .edit-answer .edit-answer-mnu ul li').addClass("inactive").removeClass("active");
			$(this).addClass("active").removeClass("inactive");
			$('.edit-answer div[class^="edit-answer-content"] label.vasya').html('Map url:');
			$('.answer-hidden-kind').val('3');

			check_input();
		});
		$('.edit-answer-mnu #picture').click(function() {

			$('body .edit-answer .edit-answer-mnu ul li').addClass("inactive").removeClass("active");
			$(this).addClass("active").removeClass("inactive")
			$('.edit-answer div[class^="edit-answer-content"] label.vasya').html('Image url:');
			$('.answer-hidden-kind').val('1');

			check_input();
		});
		// $('form>.input-group').click(function(e) {
		// 	$(this).addClass('field-remove');
		// });

		// $('.input-group-btn .btn-danger').click(function(e) {
		// 	$(".field-remove").remove();
		// });

		//$('.lol').tokenfield();
		//$('.lol').tokenfield();
		//$('.lol').tokenfield('createToken', { value: 'violet', label: 'Violet' });
		//$("#tokenfield63").tokenfield('createToken', { value: 'violellllll', label: 'Violet' });


	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});
