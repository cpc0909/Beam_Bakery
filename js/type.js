$(document).on('pagebeforeshow', '#calculate_ingredient', function(){ 
		var output = '';
		$.getJSON("http://beam-bakery.com/server/type.php", function(data){
        
		$.each(data.types, function(i,type){
			
			link = 'calculate.html?id='+type.id;
			
			output += '<li><a onclick="redirect(\''+link+'\')">'+type.name+'</a></li>';
		
		});
		
		  $('#product_type').html(output).listview("refresh");
		
  });           
});


$(document).on('pagebeforeshow', '#type', function(){  
		var output = '';
		$.getJSON("http://beam-bakery.com/server/type.php", function(data){
        
		$.each(data.types, function(i,type){
			
			link = 'product_type_edit.html?id='+type.id;
			
			output += '<li><a onclick="redirect(\''+link+'\')">'+type.name+'</a></li>';
		
		});
		
		  $('#items').html(output).listview("refresh");
		
  });           
});


$(document).on('pagebeforeshow', '#add_type', function(){  

	
	$.getJSON("http://beam-bakery.com/server/get_ingredients.php", function(data){
			
			var output = '<li data-role="list-divider" data-groupoptions="ingredients">Ingredients</li>';

			var value = '0';
			
			$.each(data.ingredients, function(i,ingredient){
			
			output += '<li data-groupoptions="'+ingredient.name+'" data-icon="false"><a><table><tr><td width="200px">'+ingredient.name+'</td><td><input type="text" name="values[]" value="'+value+'" size="10"> <font size="1">Gram</font><input type="hidden" name="ingredient_id[]" value="'+ingredient.id+'"></td></tr></table></a></li>';//RM '+product.price+' 			
			
		});
		
        $('#items2').html(output).listview("refresh");
		
	});  




	   $('#addType').submit(function() { // catch the form's submit event

		if($('#name').val().length > 0){
		 
			var ingredient_ids = $('input[name="ingredient_id[]"]')
			   .map(function() { return $(this).val() })
			   .get()
			   .join(",");

			var values = $('input[name="values[]"]')
			   .map(function() { return $(this).val() })
			   .get()
			   .join(",");

		 
		 
		 $.ajax({url: 'http://beam-bakery.com/server/add_type.php',
                    data: {
						values : values, 
						ingredient_ids :ingredient_ids, 
						name : $('#name').val(), 
						weight : $('#weight').val(), 
						enable : $("#enable option:selected").val()
					}, // Convert a form to a JSON string representation
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
								alert('add new product type successfully');
								$.mobile.changePage("product_type.html");
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


$(document).on('pagebeforeshow', '#edit_type', function(){  
        
		
		var id = getParameterByName()["id"];
	
		$.getJSON("http://beam-bakery.com/server/get_type.php?id="+id, function(data){
        var output = '';
                    $.each(data.types, function(i,type){

					$('#name').val(type.name);		
					//$('#enable').val(ingredient.enable);	
					$("#enable").val(type.enable).change();					
					$('#id').val(type.id);
					$('#weight').val(type.weight);

					
			 });
		
		}); 
		
		
		$.getJSON("http://beam-bakery.com/server/get_ingredients_value.php?id="+id, function(data){
			
			var output = '<li data-role="list-divider" data-groupoptions="ingredients">Ingredients</li>';

			
			$.each(data.ingredients, function(i,ingredient){
			var value = ingredient.value;

			output += '<li data-groupoptions="'+ingredient.name+'" data-icon="false"><a><table><tr><td width="200px">'+ingredient.name+'</td><td><input type="text" name="values[]" value="'+value+'" size="10"> <font size="1">Gram</font><input type="hidden" name="ingredient_id[]" value="'+ingredient.id+'"></td></tr></table></a></li>';//RM '+product.price+' 			
			
		});
		
        $('#items2').html(output).listview("refresh");
		
		}); 
		
		
		$('#editType').submit(function() { // catch the form's submit event
		if($('#name').val().length > 0){
		
		var ingredient_ids = $('input[name="ingredient_id[]"]')
			   .map(function() { return $(this).val() })
			   .get()
			   .join(",");

			var values = $('input[name="values[]"]')
			   .map(function() { return $(this).val() })
			   .get()
			   .join(",");
		
		 $.ajax({url: 'http://beam-bakery.com/server/edit_type.php',
                    data: {
						values : values, 
						ingredient_ids :ingredient_ids, 
						name : $('#name').val(), 
						id : $('#id').val(), 
						weight : $('#weight').val(), 
						enable : $("#enable option:selected").val()
					}, // Convert a form to a JSON string representation
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
								alert('update product type successfully');
								$.mobile.changePage("product_type.html");
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







$(document).on('pagebeforeshow', '#calculate', function(){  

	
	var id = getParameterByName()["id"];
	
	$.getJSON("http://beam-bakery.com/server/get_type.php?id="+id, function(data){
	var output = '';
				$.each(data.types, function(i,type){

				$('#ingredient').html(type.name);	
				
				$('#id').val(type.id);		
			
		 });
	
	}); 



	$.getJSON("http://beam-bakery.com/server/get_type_products.php?id="+id, function(data){
			
			var output = '<li data-role="list-divider" data-groupoptions="ingredients">Products Quantity</li>';

			var value = '0';
			
			$.each(data.products, function(i,product){
			
			output += '<li data-groupoptions="'+product.pname+'" data-icon="false"><a><table><tr><td width="200px">'+product.pname+'</td><td><input type="text" name="qty[]" value="0" size="10"></td></tr></table></a></li>'
			
		});
		
        $('#items2').html(output).listview("refresh");
		
	});
	

	$('#calculate_submit').submit(function() { 

		var values = $('input[name="qty[]"]')
			   .map(function() { return $(this).val() })
			   .get()
			   .join(",");
	
		if($('#qty').val().length > 0){
		
			$.mobile.loading('show');
			
			id = $('#id').val();
			
			qty = $('#qty').val();
			
			
			
			left_weight = $('#left_weight').val();
	

	

			$.ajax({url: 'http://beam-bakery.com/server/calculate.php?id='+id,
				   
				   data: {
						qty : qty,
						left_weight : left_weight,
						values : values
					}, // Convert a form to a JSON string representation
					type: 'post',                   
                    async: true,
                    beforeSend: function() {
                        $.mobile.loading('show');// This will show ajax spinner
                    },
                    complete: function() {
                        $.mobile.loading('hide');// This will show ajax spinner
                    },
                    success: function (result) {
						$('#items').html(result);
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