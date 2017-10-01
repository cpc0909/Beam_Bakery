$(document).on('pagebeforeshow', '#ingredients', function(){  
		
		$.getJSON("http://beam-bakery.com/server/ingredients.php", function(data){
        
		var output = '';
		
		$.each(data.ingredients, function(i,ingredient){
			
			link = 'product_ingredients_edit.html?id='+ingredient.id;
			
			output += '<li><a onclick="redirect(\''+link+'\')">'+ingredient.name+'</a></li>';
		
		});
		
        $('#items').html(output).listview("refresh");
  });            
});


$(document).on('pagebeforeshow', '#add_ingredient', function(){  
	   $('#addIngredient').submit(function() { // catch the form's submit event

		if($('#name').val().length > 0){
		 
		 $.ajax({url: 'http://beam-bakery.com/server/add_ingredient.php',
                    data: {
						name : $('#name').val(), 
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
								alert('add new ingredient successfully');
								$.mobile.changePage("product_ingredients.html");
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


$(document).on('pagebeforeshow', '#edit_ingredient', function(){  
        
		
	 var id = getParameterByName()["id"];
	
		$.getJSON("http://beam-bakery.com/server/get_ingredient.php?id="+id, function(data){
        var output = '';
                    $.each(data.ingredients, function(i,ingredient){

					$('#name').val(ingredient.name);		
					//$('#enable').val(ingredient.enable);	
					$("#enable").val(ingredient.enable).change();					
					$('#id').val(ingredient.id);

					
			 });
		
		}); 
		
		
		$('#editIngredient').submit(function() { // catch the form's submit event
		if($('#name').val().length > 0){
		 
		 $.ajax({url: 'http://beam-bakery.com/server/edit_ingredient.php',
                    data: {
						name : $('#name').val(), 
						id : $('#id').val(), 
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
								alert('update ingredient successfully');
								$.mobile.changePage("product_ingredients.html");
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