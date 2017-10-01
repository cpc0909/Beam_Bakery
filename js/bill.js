//list bill.
$(document).on('pagebeforeshow', '#customer_bill', function(){  
	
	var id = getParameterByName()["id"];
	var date = getParameterByName()["date"];
		
	$.getJSON("http://beam-bakery.com/server/get_customer.php?id="+id, function(data){
			$.each(data.customers, function(i,customer){
					$('#customer_bill_dashboard').html(customer.name);	
			});
		}); 
		
		
var id = getParameterByName()["id"];
		
	$.getJSON("http://beam-bakery.com/server/previous_order.php?id="+id, function(data){
			
			var output = '';
			$.each(data.orders, function(i,order){
			link = 'customer_bill_detail.html?id='+order.uid+'&date='+order.orderdate;	
			output += '<li><a onclick="redirect(\''+link+'\')">'+order.orderdate+'</a></li>';
			
		});
		
        $('#items').html(output).listview("refresh");
	
	});	        
});            
 
$(document).on('pagebeforeshow', '#customer_bill_detail', function(){  
	
	var id = getParameterByName()["id"];
	var date = getParameterByName()["date"];
		
	url	=	'http://beam-bakery.com/server/customer_bill_detail_print.php?id='+id+'&date='+date;
		
	$.getJSON("http://beam-bakery.com/server/get_customer.php?id="+id, function(data){
			$.each(data.customers, function(i,customer){
						
						$('#bill_order_dashboard').html(customer.name);	
						$('#bill_order_date').html(date);	
						$('#date').val(date)
			});
		}); 
		
	
		 
		$.ajax({url: 'http://beam-bakery.com/server/customer_bill_detail.php?id='+id,
				   
				   data: {
						date : getParameterByName()["date"]
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
    
	/*$('#items').html(output).listview("refresh");*/
	
	});
 
//product ordered.
$(document).on('pagebeforeshow', '#product_ordered', function(){  
	
	$.getJSON("http://beam-bakery.com/server/product_ordered.php", function(data){
			
			var output = '';
			$.each(data.orders, function(i,order){
			link = 'product_ordered_list.html?date='+order.orderdate;	
			output += '<li><a onclick="redirect(\''+link+'\')">'+order.orderdate+'</a></li>';
			
		});
		
        $('#items').html(output).listview("refresh");
	
	});	        
});             


//product ordered list.
$(document).on('pagebeforeshow', '#product_ordered_list', function(){  
	
	var date = getParameterByName()["date"];
	
	$('#product_order_date').html(date);
	
	$.getJSON("http://beam-bakery.com/server/product_ordered_list.php?date="+date, function(data){
			
			var output = '';
			$.each(data.orders, function(i,order){
			link = 'product_ordered_detail.html?date='+date+'&pid='+order.id;	
			output += '<li><a onclick="redirect(\''+link+'\')">'+order.pname+' ( '+order.qty+' )</a></li>';
			
		});
		
        $('#items').html(output).listview("refresh");
	
	});	        
});

//product ordered list.
$(document).on('pagebeforeshow', '#product_ordered_detail', function(){  
	
	var date = getParameterByName()["date"];
	var pid = getParameterByName()["pid"];

	$.getJSON("http://beam-bakery.com/server/get_product.php?id="+pid, function(data){
			 $.each(data.products, function(i,product){
				$('#product_order_name').html(product.name);	
			});
		}); 
	
	$('#product_order_date').html(date);
	
	$.getJSON("http://beam-bakery.com/server/product_ordered_detail.php?date="+date+"&pid="+pid, function(data){
			
			var output = '';
			$.each(data.orders, function(i,order){
			//link = 'product_ordered_detail.html?date='+date+'&pid='+order.id;	
			output += '<li><a data-icon="false">'+order.cname+' ( '+order.qty+' )</a></li>';
			
		});
		
        $('#items').html(output).listview("refresh");
	
	});	        
});

function update_bill(){
	var id = getParameterByName()["id"];
					
		$.ajax({url: 'http://beam-bakery.com/server/customer_bill_update.php?id='+id,
				   
		   data: {
				date : getParameterByName()["date"],
				paid : $('#paid').val(),
				grand_total : $('#grand_total').val(),
			}, 
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
						alert('this bill has saved.')
					}
				else{
								runtimePopup(result);		
					}	
			},
			error: function (request,error) {
				runtimePopup('Network error has occurred please try again!');
			}
		});   

}

$(document).on('pagebeforeshow', '#customer_bill_detail2', function(){  
	
	var id = getParameterByName()["id"];
	var date = getParameterByName()["date"];
		
	$.getJSON("http://beam-bakery.com/server/get_customer.php?id="+id, function(data){
			$.each(data.customers, function(i,customer){
						
						$('#bill_order_dashboard').html(customer.name);	
						$('#bill_order_date').html(date);	
						$('#date').val(date)
			});
		}); 
		
	
		 
		$.ajax({url: 'http://beam-bakery.com/server/customer_bill_detail2.php?id='+id,
				   
				   data: {
						date : getParameterByName()["date"]
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
    
	/*$('#items').html(output).listview("refresh");*/
	
	});
