

$(document).on('pagebeforeshow', '#product', function(){  
var cname;
      $.getJSON("http://beam-bakery.com/server/product.php", function(data){
        var output = '';
                    $.each(data.products, function(i,product){

		
		if(cname != product.cname)
			{
			
				output += '<li data-role="list-divider" data-groupoptions="'+product.cname+'">'+product.cname+'</li>';
				 
			}
		
				output += '<li data-groupoptions="'+product.cname+'"><a href="product_edit.html?id='+product.id+'">'+product.pname+'</a></li>';
		
		
		cname = product.cname;
		
		
		
		});
		
        $('#items').html(output).listview("refresh");
  });            

 });

 
 
	$(document).on('pagebeforeshow', '#add_product', function(){  
       
		$.getJSON("http://beam-bakery.com/server/category.php", function(data){
			var output = '<option value="">Plese Choose</option>';
				$.each(data.categories, function(i,category){
					output += '<option value="'+category.id+'">' +category.name+ '</option>';
				});
			$('#select-choice-1').html(output).selectmenu('refresh');
		});  
	
		$.getJSON("http://beam-bakery.com/server/type.php", function(data){
			var output = '<option value="">Plese Choose</option>';
				$.each(data.types, function(i,type){
					output += '<option value="'+type.id+'">' +type.name+ '</option>';
				});
			$('#select-choice-2').html(output).selectmenu('refresh');
		});  

	   $('#addproduct').submit(function() { // catch the form's submit event
        if($('#name').val().length > 0 && $("#select-choice-1 option:selected").val().length > 0){
            $.ajax({url: 'http://beam-bakery.com/server/add_product.php',
                    data: {name : $('#name').val(), description : $('#description').val(),status : $('input:radio[name=status]:checked').val(),cid : $("#select-choice-1 option:selected").val(),tid : $("#select-choice-2 option:selected")}, // Convert a form to a JSON string representation
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
								alert('add new product successfully');
								$.mobile.changePage("product.html");
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
 
 
$(document).on('pagebeforeshow', '#edit_product', function(){  
        
		
		$.getJSON("http://beam-bakery.com/server/category.php", function(data){
			var output = '<option value="">Please Choose</option>';
				$.each(data.categories, function(i,category){
					output += '<option value="'+category.id+'">' +category.name+ '</option>';
				});
			$('#select-choice-1').html(output).selectmenu('refresh');
		}); 
		
		$.getJSON("http://beam-bakery.com/server/type.php", function(result){
			var output = '<option value="">Please Choose</option>';
				$.each(result.types, function(i,type){
					output += '<option value="'+type.id+'">' +type.name+ '</option>';
				});
			$('#select-choice-2').html(output).selectmenu('refresh');
		});  
		
	 var id = getParameterByName()["id"];
	//location = url+'?user='+param;
		$.getJSON("http://beam-bakery.com/server/get_product.php?id="+id, function(data){
        var output = '';
                    $.each(data.products, function(i,product){

					$('#name').val(product.name);		
					$('#description').val(product.description);		
					$('#pid').val(product.id);
					$('#ori').val(product.name);	
					$('#select-choice-1').val(product.category).selectmenu('refresh');			
					$('#select-choice-2').val(product.type).selectmenu('refresh')			
					//$('select[name=][value='+product.category+']').attr('selected', true);
					
					if(product.status=="1")	{ 	$('input[name=status][value=1]').attr('checked', true); $("input[type='radio']").checkboxradio("refresh");}
					else			{	$('input[name=status][value=0]').attr('checked', true); $("input[type='radio']").checkboxradio("refresh");}
			 });
		
		}); 
		
		
		$('#editproduct').submit(function() { // catch the form's submit event
        if($('#name').val().length > 0 && $("#select-choice-1 option:selected").val().length > 0){
            $.ajax({url: 'http://beam-bakery.com/server/edit_product.php',
                    data: {name : $('#name').val(), description : $('#description').val(),status : $('input:radio[name=status]:checked').val(),pid : $('#pid').val(),ori : $('#ori').val(),cid : $("#select-choice-1 option:selected").val(),tid : $("#select-choice-2 option:selected").val()}, // Convert a form to a JSON string representation
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
								$.mobile.changePage("product.html");
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
         $.ajax({url: 'http://beam-bakery.com/server/delete_product.php',
                    data: {pid : $('#pid').val()}, // Convert a form to a JSON string representation
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
								$.mobile.changePage("product.html");
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
 
 
 