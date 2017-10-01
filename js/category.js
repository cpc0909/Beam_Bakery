


$(document).on('pagebeforeshow', '#category', function(){  

      $.getJSON("http://beam-bakery.com/server/category.php", function(data){
        var output = '';
                    $.each(data.categories, function(i,category){

		
		 output += '<li><a href="product_category_edit.html?id='+category.id+'">' +category.name+ '</a></li>';
		
		});
		
        $('#items').html(output).listview("refresh");
  });            

 });

 
 
$(document).on('pagebeforeshow', '#add_category', function(){  
       $('#addcategory').submit(function() { // catch the form's submit event
     
	   if($('#name').val().length > 0 ){
            $.ajax({url: 'http://beam-bakery.com/server/add_category.php',
                    data: {name : $('#name').val(), description : $('#description').val(),status : $('input:radio[name=status]:checked').val()}, // Convert a form to a JSON string representation
                        type: 'post',                   
                    async: true,
                    beforeSend: function() {
                        $.mobile.loading('show');// This will show ajax spinner
                    },
                    complete: function() {
                        $.mobile.loading('hide');// This will show ajax spinner
                    },
                    success: function (result) {
						if(result==1)
							{	
								alert('add new category successfully.')
								$.mobile.changePage("product_category.html");
								//$.mobile.changePage("product_category.html");
							}
						else{
								runtimePopup(result);
								
							}	
					},
                    error: function (request,error) {
                        runtimePopup('Network error has occurred please try again!');
                    }
                });                   
        } else {
           
			runtimePopup('Please fill all nececery fields')
        }           
            return false; 
        });    
}); 
 
 
 $(document).on('pagebeforeshow', '#edit_category', function(){  
 
 var id = getParameterByName()["id"];
 
		 $.getJSON("http://beam-bakery.com/server/get_category.php?id="+id, function(data){
        var output = '';
                    $.each(data.categories, function(i,category){

					$('#name').val(category.name);		
					$('#description').val(category.description);		
					$('#cid').val(category.id);		
					$('#ori').val(category.name);		
					
					if(category.status=="1")	{ 	$('input[name=status][value=1]').attr('checked', true); $("input[type='radio']").checkboxradio("refresh");}
					else			{	$('input[name=status][value=0]').attr('checked', true); $("input[type='radio']").checkboxradio("refresh");}
			 });
		
  }); 
		
		
		$('#editcategory').submit(function() { // catch the form's submit event
        if($('#name').val().length > 0 ){
            $.ajax({url: 'http://beam-bakery.com/server/edit_category.php',
                    data: {name : $('#name').val(), description : $('#description').val(),status : $('input:radio[name=status]:checked').val(),cid : $('#cid').val(),ori : $('#ori').val()}, // Convert a form to a JSON string representation
                        type: 'post',                   
                    async: true,
                    beforeSend: function() {
                        $.mobile.loading('show');// This will show ajax spinner
                    },
                    complete: function() {
                        $.mobile.loading('hide');// This will show ajax spinner
                    },
                    success: function (result) {
						if(result==1)
							{	
								alert('update successfully');
								$.mobile.changePage("product_category.html");
								//$.mobile.changePage("product_category.html");
							}
						else{
								runtimePopup(result);
								
							}	
					},
                    error: function (request,error) {
                        runtimePopup('Network error has occurred please try again!');
                    }
                });                   
        } else {
           
			runtimePopup('Please fill all nececery fields')
        }           
            return false; 
        });   

	
	$('#Delete').on('click', function () {
    confirmDialog("Are you sure?", function(){
         $.ajax({url: 'http://beam-bakery.com/server/delete_category.php',
                    data: {cid : $('#cid').val()}, // Convert a form to a JSON string representation
                        type: 'post',                   
                    async: true,
                    beforeSend: function() {
                        $.mobile.loading('show');// This will show ajax spinner
                    },
                    complete: function() {
                        $.mobile.loading('hide');// This will show ajax spinner
                    },
                    success: function (result) {
						if(result==1)
							{	
								alert('delete successfully');
								$.mobile.changePage("product_category.html");
								//$.mobile.changePage("product_category.html");
							}
						else{
								runtimePopup(result);
								
							}	
					},
                    error: function (request,error) {
                        runtimePopup('Network error has occurred please try again!');
                    }
                });
    });
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



 
function link(url){

	$.mobile.changePage(location);
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

