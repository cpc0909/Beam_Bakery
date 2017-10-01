

$(document).on('pagebeforeshow', '#customer', function(){  
      $.getJSON("http://beam-bakery.com/server/customer.php", function(data){
        var output = '';
                    $.each(data.customers, function(i,customer){
					link = 'customer_dashboard.html?id='+customer.id;
		output += '<li><a onclick="redirect(\''+link+'\')">'+customer.name+'</a></li>';
		
		});
		
        $('#items').html(output).listview("refresh");
  });            

 });

 
 
	$(document).on('pagebeforeshow', '#add_customer', function(){  
	   $('#addcustomer').submit(function() { // catch the form's submit event

		if($('#username').val().length > 0 && $('#password').val().length > 0 && $('#name').val().length > 0 && $('#phone').val().length > 0){
		 
		 $.ajax({url: 'http://beam-bakery.com/server/add_customer.php',
                    data: {
						username : $('#username').val(), 
						password : $('#password').val(),
						name : $('#name').val(),
						email : $('#email').val(),
						phone : $('#phone').val(),
						contact : $('#contact').val(),
						address : $('#address').val()					
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
								alert('add new customer successfully');
								$.mobile.changePage("customer.html");
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
 
 
$(document).on('pageshow', '#customer_dashboard', function(){  
	var id = getParameterByName()["id"];
		$.getJSON("http://beam-bakery.com/server/get_customer.php?id="+id, function(data){
			$.each(data.customers, function(i,customer){
						$('#cust').val(customer.name);	
			});
		}); 
	});
	
	
$(document).on('pagebeforeshow', '#products_price', function(){  
	
	var id = getParameterByName()["id"];
		
		$.getJSON("http://beam-bakery.com/server/get_customer.php?id="+id, function(data){
			$.each(data.customers, function(i,customer){
						$('#product_price_dashboard').html(customer.name);	
						
			});
		}); 
		
	var cname;
		$.getJSON("http://beam-bakery.com/server/products_price.php?id="+id, function(data){
			
			var output = '';
			$.each(data.products, function(i,product){
			
			if(cname != product.cname)
			{
				output += '<li data-role="list-divider" data-groupoptions="'+product.cname+'">'+product.cname+'</li>';
			}
			
			if(!product.price){	price	=	0;	}else{	price	=	product.price;	}
				
			output += '<li data-groupoptions="'+product.cname+'" data-icon="false"><a><table><tr><td width="100px">'+product.pname+'</td><td><font size="1">RM</font> <input type="text" name="product_price[]" size="10" value="'+price+'"><input type="hidden" name="product_id[]" value="'+product.id+'"></td></tr></table></a></li>';
			cname = product.cname;
			
		});
		
        $('#items').html(output).listview("refresh");
		
		
  });            
	
		
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

		$('#editproductsprice').submit(function() { // catch the form's submit event
 
 			var product_ids = $('input[name="product_id[]"]')
                       .map(function() { return $(this).val() })
                       .get()
                       .join(",");

			var product_prices = $('input[name="product_price[]"]')
                       .map(function() { return $(this).val() })
                       .get()
                       .join(",");
			
 
            $.ajax({url: 'http://beam-bakery.com/server/update_product_price.php?id='+id,
                    data: {
						product_id : product_ids,						
						product_price : product_prices						
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
								alert('update successfully');
								//runtimePopup('Product price update successfully');
redirect_customer('customer_dashboard.html');
							}
						else{
								runtimePopup(result);
								
							}	
					},
                    error: function (request,error) {
                        runtimePopup('Network error has occurred please try again!');
                    }
                }); 

			            return false; 
			
       });
		
	////////////////////////////////////////////////////////////////////////////////////////////////////	
		
		
		
		
	});	
 
$(document).on('pagebeforeshow', '#edit_customer', function(){  
        
		
	 var id = getParameterByName()["id"];
	//location = url+'?user='+param;
		$.getJSON("http://beam-bakery.com/server/get_customer.php?id="+id, function(data){
        var output = '';
                    $.each(data.customers, function(i,customer){

					$('#username').val(customer.username);		
					$('#password').val(customer.password);		
					$('#name').val(customer.name);		
					$('#email').val(customer.email);		
					$('#phone').val(customer.phone);		
					$('#contact').val(customer.contact);		
					$('#address').val(customer.address);		
					$('#uid').val(customer.id);
					$('#ori').val(customer.username);	
					
			 });
		
		}); 
		
		
		$('#editcustomer').submit(function() { // catch the form's submit event
		if($('#username').val().length > 0 && $('#password').val().length > 0 && $('#name').val().length > 0 && $('#phone').val().length > 0){
            $.ajax({url: 'http://beam-bakery.com/server/edit_customer.php',
                    data: {username : $('#username').val(), 
						password : $('#password').val(),
						name : $('#name').val(),
						email : $('#email').val(),
						phone : $('#phone').val(),
						contact : $('#contact').val(),
						address : $('#address').val(),
						uid : $('#uid').val(),
						ori : $('#ori').val()						
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
								alert('update successfully');
								//$.mobile.changePage("customer.html");
								redirect_customer("customer_dashboard.html");
								//$.mobile.changePage("customer_category.html");
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
         $.ajax({url: 'http://beam-bakery.com/server/delete_customer.php',
                    data: {uid : $('#uid').val()}, // Convert a form to a JSON string representation
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
								$.mobile.changePage("customer.html");
								//$.mobile.changePage("customer_category.html");
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

//product order..
$(document).on('pagebeforeshow', '#products_order', function(){  
	
	var id = getParameterByName()["id"];
		
	$.getJSON("http://beam-bakery.com/server/get_customer.php?id="+id, function(data){
			$.each(data.customers, function(i,customer){
						
						$('#product_price_dashboard').html(customer.name);	
						
			});
		}); 
		
		
	var cname;
		$.getJSON("http://beam-bakery.com/server/products_order_new.php?id="+id, function(data){
			
			var output = '';
			$.each(data.products, function(i,product){
			
			if(cname != product.cname)
			{
				output += '<li data-role="list-divider" data-groupoptions="'+product.cname+'">'+product.cname+'</li>';
			}
			
			if(!product.qty){	qty	=	0;	}else{	qty	=	product.qty;	}
				
			output += '<li data-groupoptions="'+product.cname+'" data-icon="false"><a><table><tr><td width="200px">'+product.pname+'</td><td><font size="1">Quantity</font> <input type="text" name="product_qty[]" value="'+qty+'" size="10"><input type="hidden" name="product_id[]" value="'+product.id+'"></td></tr></table></a></li>';//RM '+product.price+' 
			cname = product.cname;
			
		});
		
        $('#items').html(output).listview("refresh");
		
		
  });            
		
		
	//add new order.
	 $('#orderproduct').submit(function() { // catch the form's submit event

		if($('#date').val().length > 0){
		 
		  var product_ids = $('input[name="product_id[]"]')
                       .map(function() { return $(this).val() })
                       .get()
                       .join(",");

			var product_qtys = $('input[name="product_qty[]"]')
                       .map(function() { return $(this).val() })
                       .get()
                       .join(",");
 
		 
		$.ajax({url: 'http://beam-bakery.com/server/update_order.php?id='+id,
				   
				   data: {
						product_id : product_ids,
						product_qty : product_qtys,
						date : $('#date').val(),
						neworder : '1'
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
								alert('new order created')
								redirect_customer("customer_order_dashboard.html");
							}
						else if (result==2)
							{
								runtimePopup('Order have been created on this date.');
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
           
			runtimePopup('Please select the order date')
        }           
            return false; 
        });
		
});	
 
 
//customer order management

$(document).on('pagebeforeshow', '#customer_order_dashboard', function(){  
	
	var id = getParameterByName()["id"];
		
	$.getJSON("http://beam-bakery.com/server/get_customer.php?id="+id, function(data){
			$.each(data.customers, function(i,customer){
						
						$('#order_dashboard').html(customer.name);	
						
			});
		});


	$.getJSON("http://beam-bakery.com/server/previous_order.php?id="+id, function(data){
			
			var output = '';
			$.each(data.orders, function(i,order){
			link = 'order_edit.html?id='+order.uid+'&date='+order.orderdate;	
			output += '<li><a onclick="redirect(\''+link+'\')">'+order.orderdate+'</a></li>';
			
		});
		
        $('#items').html(output).listview("refresh");
	
		
});	
});	
  
//edit order.
$(document).on('pagebeforeshow', '#products_order_edit', function(){  
	
	var id = getParameterByName()["id"];
	var date = getParameterByName()["date"];
		
	$.getJSON("http://beam-bakery.com/server/get_customer.php?id="+id, function(data){
			$.each(data.customers, function(i,customer){
						
						$('#product_order_dashboard').html(customer.name);	
						$('#product_order_date').html(date);	
						$('#date').val(date)
			});
		}); 
		
		
	var cname;
	
	$.getJSON("http://beam-bakery.com/server/products_order.php?id="+id+"&date="+date, function(data){
			
			var output = '';
			$.each(data.products, function(i,product){
			
			if(cname != product.cname)
			{
				output += '<li data-role="list-divider" data-groupoptions="'+product.cname+'">'+product.cname+'</li>';
			}
			
			if(!product.qty){	qty	=	0;	}else{	qty	=	product.qty;	}
				
			output += '<li data-groupoptions="'+product.cname+'" data-icon="false"><a><table><tr><td width="200px">'+product.pname+'</td><td><font size="1">Quantity</font> <input type="text" name="product_qty[]" value="'+qty+'" size="10"><input type="hidden" name="product_id[]" value="'+product.id+'"></td></tr></table></a></li>';//RM '+product.price+' 
			cname = product.cname;
			
		});
		
        $('#items').html(output).listview("refresh");
	});            
	
	//add new order.
	 $('#orderproductedit').submit(function() { // catch the form's submit event

		if($('#date').val().length > 0){
		 
		  var product_ids = $('input[name="product_id[]"]')
                       .map(function() { return $(this).val() })
                       .get()
                       .join(",");

			var product_qtys = $('input[name="product_qty[]"]')
                       .map(function() { return $(this).val() })
                       .get()
                       .join(",");
 
		 
		$.ajax({url: 'http://beam-bakery.com/server/update_order.php?id='+id,
				   
				   data: {
						product_id : product_ids,
						product_qty : product_qtys,
						date : $('#date').val(),
						copy_order_date	:	$('#copy_order_date').val(),
						neworder : '0'
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
								redirect_customer("customer_order_dashboard.html");
							}
						else if (result==2)
							{
								runtimePopup('Order have been created on this date.');
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
           
			runtimePopup('Please select the order date')
        }           
            return false; 
        });
	
	
		$('#Delete').on('click', function () {
    confirmDialog("Are you sure?", function(){
         $.ajax({url: 'http://beam-bakery.com/server/delete_order.php?id='+id,
                    data: {date : $('#date').val(),}, // Convert a form to a JSON string representation
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
								redirect_customer('customer_order_dashboard.html');
								//$.mobile.changePage("customer_category.html");
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
 
 $(document).on('pagebeforeshow', '#report2', function(){  
	
   $('#report_grid').click(function() {

         
			
			$.ajax({url: 'http://beam-bakery.com/server/report.php',
				   
				   data: {
						fdate : $('#fdate').val(),
						tdate : $('#tdate').val()
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
						$('#item_list').html(result);
					},
                    error: function (request,error) {
				
                        runtimePopup('Network error has occurred please try again!');
                    }
                });
			
	});
	
});