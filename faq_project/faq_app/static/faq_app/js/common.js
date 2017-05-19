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

			if ($('.answer-hidden-kind').val() != '4') {
				$('#extra').show();
				$("div.buttons-wrapper").hide();

			} else{
				$('#extra').hide();
				$("div.buttons-wrapper").show();

			}

		};



		//$('.edit-answer-mnu #text').addClass("active");
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

		$('.edit-answer-mnu #button').click(function() {

			$('body .edit-answer .edit-answer-mnu ul li').addClass("inactive").removeClass("active");
			$(this).addClass("active").removeClass("inactive")
			$('.edit-answer div[class^="edit-answer-content"] label.vasya').html('Text:');
			$('.answer-hidden-kind').val('4');

			check_input();
		});

		$('.js-new-button').click(function(){
			var btn = $(this);
			answer_id = btn.attr("answer-id");

			$.ajax({
	      url: '/faq/create_button/' + answer_id,
	      type: 'get',
	      dataType: 'json',
	      beforeSend: function () {

	        //$("#modal-button").modal("show");
					//$("#modal-book").delay(1000).modal("hide");

	      },
	      success: function (data) {
	        $("#modal-button .modal-content").html(data.html_form);
	      }
	    });
		});


		$(".js-button-create-form").submit(function (event) {


	  event.stopImmediatePropagation();
		var form = $(this);

		$.ajax({
			url: form.attr("action"),
			data: form.serialize(),
			type: form.attr("method"),
			dataType: 'json',
			success: function (data) {
				if (data.form_is_valid) {

					$("#modal-button").modal("hide");
					$("#modal-book").modal("show");

					$(".buttons-list-wrapper").html(data.html_buttons_list)
					//var group_id = data.group_id;

					//$('.fields' + group_id).html(data.html_answers_list);

				}
				else {
					$("#modal-button .modal-content").html(data.html_form);
				}
			}
		});


		//$("#modal-button").modal("hide");
		return false;
		});
		//window.extra = false;
		$('.js-extra-part').click(function(e){
			//alert("sdf");
			//e.preventDefault();
			//window.extra = true;

			$('.js-answer-create-form').submit();
			setTimeout(function(){
				$('.js-new-answer[group-id="' + window.group + '"]').trigger('click');
			}, 400);

			return false;
			/*
			$.ajax({
	      url: '/faq/create_answer/71',
	      type: 'get',
	      dataType: 'json',
	      beforeSend: function () {
					alert("sdf");
	        $("#modal-book").modal("show");
	      },
	      success: function (data) {
	        $("#modal-book .modal-content").html(data.html_form);
	      }
	    });
			*/
			 //$("#modal-book").modal("hide");

       //$('.js-new-answer[group-id="71"]').trigger('click');

			 //$("#modal-book").modal("show");

		});


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
