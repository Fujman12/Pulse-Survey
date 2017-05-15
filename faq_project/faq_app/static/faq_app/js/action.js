$(function () {

  $.ajaxSetup({
     beforeSend: function(xhr, settings) {
         function getCookie(name) {
             var cookieValue = null;
             if (document.cookie && document.cookie != '') {
                 var cookies = document.cookie.split(';');
                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = jQuery.trim(cookies[i]);
                     // Does this cookie string begin with the name we want?
                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                     break;
                 }
             }
         }
         return cookieValue;
         }
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     }
   });


  $(".js-new-topic").click(function () {
    $.ajax({
      url: '/faq/create_topic/',
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-book").modal("show");
      },
      success: function (data) {
        $("#modal-book .modal-content").html(data.html_form);
      }
    });
  });

  $("#modal-book").on("submit", ".js-book-create-form", function () {
  var form = $(this);
  $.ajax({
    url: form.attr("action"),
    data: form.serialize(),
    type: form.attr("method"),
    dataType: 'json',
    success: function (data) {
      if (data.form_is_valid) {
        alert("New Topic created!");  // <-- This is just a placeholder for now for testing
        $("#modal-book").modal("hide");
        $(".select-topic").html(data.html_topics_list)
      }
      else {
        $("#modal-book .modal-content").html(data.html_form);
      }
    }
  });
  return false;
  });

  $(".js-new-group").click(function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',

      success: function (data) {
        location.reload();
      }
    });
  });

  $(".js-delete-group").click(function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',

      success: function (data) {
        alert("Q/A group has been removed")
        location.reload();
      }
    });
  });

  $(".js-switch-published").click(function () {
    var swt = $(this);
    if (swt.is(':checked')){
      $.ajax({
        url: swt.attr("data-url")+"activate",
        type: 'get',

        success: function (data) {
          alert("Question group activated!");
        }
      });
    } else {
      $.ajax({
        url: swt.attr("data-url")+"deactivate",
        type: 'get',

        success: function (data) {
          alert("Question group deactivated!");
        }
      });
    }

  })

  var i = '<i class="icon mdi mdi-chevron-down"></i>'

  $(".tkn")

  .on('tokenfield:createdtoken', function (e) {
  // Über-simplistic e-mail validation
    var group_id = $(this).attr('group-id');
    if(e.attrs.id == null){


      $.ajax({
        url: '/faq/create_question/' + group_id,
        type: 'post',
        data: {text:e.attrs.value},
        success: function (data) {
          //alert("Fuck yeah!" + data.pk);
          e.attrs.id = data.pk;

        }
      });
    }
    var new_header = ($(this).parent().children('div.token:first').children('span').html());
    //console.log(group_id);
    if (new_header != null) {
      $('a[href$="#collapse-'+ group_id + '"]').html(i + new_header);
    }
  })

  .on('tokenfield:editedtoken', function (e) {
    // Über-simplistic e-mail validation

    $.ajax({
      url: '/faq/delete_question/' + e.attrs.id,
      type: 'get',

      success: function (data) {
        //alert("Question " + e.attrs.value +" removed");
      }
    });


  })

  .on('tokenfield:removedtoken', function (e) {
    var group_id = $(this).attr('group-id');

    $.ajax({
      url: '/faq/delete_question/' + e.attrs.id,
      type: 'get',

      success: function (data) {
        //alert("Question " + e.attrs.value +" removed");
      }
    });
    var new_header = ($(this).parent().children('div.token:first').children('span').html());
    //console.log(group_id);
    if (new_header != null) {
      $('a[href$="#collapse-'+ group_id + '"]').html(i + new_header);
    }

    //alert('Token removed! Token value was: ' + e.attrs.value)
  })

  $(".js-new-answer").click(function () {

    $.ajax({
      url: '/faq/create_answer/' + $(this).attr("group-id"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-book").modal("show");
      },
      success: function (data) {
        $("#modal-book .modal-content").html(data.html_form);
      }
    });
  });

  $("#modal-book").on("submit", ".js-answer-create-form", function () {
  var form = $(this);
  $.ajax({
    url: form.attr("action"),
    data: form.serialize(),
    type: form.attr("method"),
    dataType: 'json',
    success: function (data) {
      if (data.form_is_valid) {

        $("#modal-book").modal("hide");

        var group_id = data.group_id;

        $('.fields' + group_id).html(data.html_answers_list);
      }
      else {
        $("#modal-book .modal-content").html(data.html_form);
      }
    }
  });
  return false;
  });

  $(document).on('click', '.js-edit-answer', function() {

    $.ajax({
      url:  $(this).attr("data-url"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-book").modal("show");
      },
      success: function (data) {
        $("#modal-book .modal-content").html(data.html_form);

        var tab_value = $('.answer-hidden-kind').val();
    		if (tab_value != null) {

    			switch (tab_value) {
    				case '0':
    					$('.edit-answer-mnu #text').trigger("click");
    					break;

    				case '1':
    					$('.edit-answer-mnu #picture').trigger("click");
    					break;

    				case '2':
    					$('.edit-answer-mnu #video').trigger("click");
    					break;

    				case '3':
    					$('.edit-answer-mnu #maps').trigger("click");
    					break;

    				default:
    					break;

    			}
    		}
      }
    });
  });

  $("#modal-book").on("submit", ".js-answer-update-form", function () {
  var form = $(this);
  $.ajax({
    url: form.attr("action"),
    data: form.serialize(),
    type: form.attr("method"),
    dataType: 'json',
    success: function (data) {
      if (data.form_is_valid) {

        $("#modal-book").modal("hide");

        var group_id = data.group_id;

        $('.fields' + group_id).html(data.html_answers_list);

      }
      else {
        $("#modal-book .modal-content").html(data.html_form);
      }
    }
  });
  return false;
  });


  $(document).on('click','.js-delete-answer', function(){
    $.ajax({
      url: $(this).attr("data-url"),
      type: 'get',
      success: function(data){

        var group_id = data.group_id;

        $('.fields' + group_id).html(data.html_answers_list);
      }
    })
  })




});

$( document ).ready(function() {


});
