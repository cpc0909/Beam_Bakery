

$(document).on('pagebeforeshow', '#login', function(){  
          $('#check-user').submit(function() { // catch the form's submit event 

        if($('#username').val().length > 0 && $('#password').val().length > 0){
            // Send data to server through ajax call
            // action is functionality we want to call and outputJSON is our data
                $.ajax({url: 'http://beam-bakery.com/server/login.php',
                    data: {username : $('#username').val(), password : $('#password').val()}, // Convert a form to a JSON string representation
                        type: 'post',                   
                    async: true,
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show');// This will show ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete
                        $.mobile.loading('hide');// This will show ajax spinner
                    },
                    success: function (result) {
							
							if(result=='failed'){
								runtimePopup('Login Failed. Please try again.');
							}
							else{
								 var value = result.split('_');
								if(value[0]!="customer")
								{
									$.mobile.changePage(value[0]+"/dashboard.html?user="+value[1]);
								}
								else
								{
									$.mobile.changePage(value[0]+"/customer_dashboard.html?id="+value[2]);
								}
							}
							
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action                
                        runtimePopup('Network error has occurred please try again!');
                    }
                });                   
        } else {
            //alert('Please fill all nececery fields');
			runtimePopup('Please fill all nececery fields')
        }           
            return false; // cancel original event to prevent form submitting
        });





	$('#Print').on('click', function () {
	alert('aaa')
	window.open('http://beam-bakery.com/beam/testprint.html', '_blank', 'location=no');

	
/*		$.ajax({url: 'http://localhost/test/print.php',
                    data: {value : 'test print....'}, // Convert a form to a JSON string representation
                        type: 'post',                   
                    async: true,
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show');// This will show ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete
                        $.mobile.loading('hide');// This will show ajax spinner
                    },
                    success: function (result) {
							

  
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action                
                        runtimePopup('Network error has occurred please try again...');
                    }
                }); 
	
	*/
	
	
	
	});

















		
});




 
 function confirmDialog(text, callback) {
    var popupDialogId = 'popupDialog';
    $('<div data-role="popup" id="' + popupDialogId + '" data-confirmed="no" data-transition="pop" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:500px;"> \
                        <div data-role="header" data-theme="a">\
                            <h1>Question</h1>\
                        </div>\
                        <div role="main" class="ui-content">\
                            <h3 class="ui-title">' + text + '</h3>\
                            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionConfirm" data-rel="back">Yes</a>\
                            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionCancel" data-rel="back" data-transition="flow">No</a>\
                        </div>\
                    </div>')
        .appendTo($.mobile.pageContainer);
    var popupDialogObj = $('#' + popupDialogId);
    popupDialogObj.trigger('create');
    popupDialogObj.popup({
        afterclose: function (event, ui) {
            popupDialogObj.find(".optionConfirm").first().off('click');
            var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true : false;
            $(event.target).remove();
            if (isConfirmed && callback) {
                callback();
            }
        }
    });
    popupDialogObj.popup('open');
    popupDialogObj.find(".optionConfirm").first().on('click', function () {
        popupDialogObj.attr('data-confirmed', 'yes');
    });
}


$(document).bind('pagechange', function() {
  $('.ui-page-active .ui-listview').listview('refresh');
  $('.ui-page-active :jqmData(role=content)').trigger('create');
});

function redirect_customer(url){
	param	=	getParameterByName()["id"];
	location2 = url+'?id='+param;
	//alert(location2)
	//$.mobile.loading('show');// This will show ajax spinner
	window.location	=	location2;
}
 
function redirect(url){
	//param	=	getParameterByName()["user"];
	//location = url+'?user='+param;
	
	window.location.assign(url);
} 
 
function runtimePopup(message, popupafterclose) {
  var template = "<div data-role='popup' class='ui-content messagePopup' style='max-width:280px;bottom:100px;'>" 
      + "<a href='#' data-role='button' data-theme='a' data-icon='delete' data-iconpos='notext' " 
      + " class='ui-btn-right closePopup'>Close</a> <span> " 
      + message + " </span> </div>";
  
  popupafterclose = popupafterclose ? popupafterclose : function () {};
 
  $.mobile.activePage.append(template).trigger("create");
 
  $.mobile.activePage.find(".closePopup").bind("tap", function (e) {
    $.mobile.activePage.find(".messagePopup").popup("close");
  });
 
  $.mobile.activePage.find(".messagePopup").popup().popup("open").bind({
    popupafterclose: function () {
      $(this).unbind("popupafterclose").remove();
      popupafterclose();
    }
  });
}


function getParameterByName() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}



