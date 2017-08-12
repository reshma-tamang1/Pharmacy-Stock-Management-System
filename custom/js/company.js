var manageCompanyTable;

$(document).ready(function() {
	// top bar active
	$('#navCompany').addClass('active');
	
	// manage company table
	managecompanyTable = $("#managecompanyTable").DataTable({
		'ajax': 'php_action/fetchcompany.php',
		'order': []		
	});

	// submit company form function
	$("#submitcompanyForm").unbind('submit').bind('submit', function() {
		// remove the error text
		$(".text-danger").remove();
		// remove the form error
		$('.form-group').removeClass('has-error').removeClass('has-success');			

		var companyName = $("#companyName").val();
		var companyStatus = $("#companyStatus").val();

		if(companyName == "") {
			$("#companyName").after('<p class="text-danger">company Name field is required</p>');
			$('#companyName').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#companyName").find('.text-danger').remove();
			// success out for form 
			$("#companyName").closest('.form-group').addClass('has-success');	  	
		}

		if(companyStatus == "") {
			$("#companyStatus").after('<p class="text-danger">company Name field is required</p>');

			$('#companyStatus').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#companyStatus").find('.text-danger').remove();
			// success out for form 
			$("#companyStatus").closest('.form-group').addClass('has-success');	  	
		}

		if(companyName && companyStatus) {
			var form = $(this);
			// button loading
			$("#createcompanyBtn").button('loading');

			$.ajax({
				url : form.attr('action'),
				type: form.attr('method'),
				data: form.serialize(),
				dataType: 'json',
				success:function(response) {
					// button loading
					$("#createcompanyBtn").button('reset');

					if(response.success == true) {
						// reload the manage member table 
						managecompanyTable.ajax.reload(null, false);						

  	  			// reset the form text
						$("#submitcompanyForm")[0].reset();
						// remove the error text
						$(".text-danger").remove();
						// remove the form error
						$('.form-group').removeClass('has-error').removeClass('has-success');
  	  			
  	  			$('#add-company-messages').html('<div class="alert alert-success">'+
            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
          '</div>');

  	  			$(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert
					}  // if

				} // /success
			}); // /ajax	
		} // if

		return false;
	}); // /submit company form function

});

function editcompanys(companyId = null) {
	if(companyId) {
		// remove hidden company id text
		$('#companyId').remove();

		// remove the error 
		$('.text-danger').remove();
		// remove the form-error
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// modal loading
		$('.modal-loading').removeClass('div-hide');
		// modal result
		$('.edit-company-result').addClass('div-hide');
		// modal footer
		$('.editcompanyFooter').addClass('div-hide');

		$.ajax({
			url: 'php_action/fetchSelectedcompany.php',
			type: 'post',
			data: {companyId : companyId},
			dataType: 'json',
			success:function(response) {
				// modal loading
				$('.modal-loading').addClass('div-hide');
				// modal result
				$('.edit-company-result').removeClass('div-hide');
				// modal footer
				$('.editcompanyFooter').removeClass('div-hide');

				// setting the company name value 
				$('#editcompanyName').val(response.company_name);
				// setting the company status value
				$('#editcompanyStatus').val(response.company_active);
				// company id 
				$(".editcompanyFooter").after('<input type="hidden" name="companyId" id="companyId" value="'+response.company_id+'" />');

				// update company form 
				$('#editcompanyForm').unbind('submit').bind('submit', function() {

					// remove the error text
					$(".text-danger").remove();
					// remove the form error
					$('.form-group').removeClass('has-error').removeClass('has-success');			

					var companyName = $('#editcompanyName').val();
					var companyStatus = $('#editcompanyStatus').val();

					if(companyName == "") {
						$("#editcompanyName").after('<p class="text-danger">company Name field is required</p>');
						$('#editcompanyName').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editcompanyName").find('.text-danger').remove();
						// success out for form 
						$("#editcompanyName").closest('.form-group').addClass('has-success');	  	
					}

					if(companyStatus == "") {
						$("#editcompanyStatus").after('<p class="text-danger">company Name field is required</p>');

						$('#editcompanyStatus').closest('.form-group').addClass('has-error');
					} else {
						// remove error text field
						$("#editcompanyStatus").find('.text-danger').remove();
						// success out for form 
						$("#editcompanyStatus").closest('.form-group').addClass('has-success');	  	
					}

					if(companyName && companyStatus) {
						var form = $(this);

						// submit btn
						$('#editcompanyBtn').button('loading');

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {

								if(response.success == true) {
									console.log(response);
									// submit btn
									$('#editcompanyBtn').button('reset');

									// reload the manage member table 
									managecompanyTable.ajax.reload(null, false);								  	  										
									// remove the error text
									$(".text-danger").remove();
									// remove the form error
									$('.form-group').removeClass('has-error').removeClass('has-success');
			  	  			
			  	  			$('#edit-company-messages').html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

			  	  			$(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert
								} // /if
									
							}// /success
						});	 // /ajax												
					} // /if

					return false;
				}); // /update company form

			} // /success
		}); // ajax function

	} else {
		alert('error!! Refresh the page again');
	}
} // /edit companys function

function removecompanys(companyId = null) {
	if(companyId) {
		$('#removecompanyId').remove();
		$.ajax({
			url: 'php_action/fetchSelectedcompany.php',
			type: 'post',
			data: {companyId : companyId},
			dataType: 'json',
			success:function(response) {
				$('.removecompanyFooter').after('<input type="hidden" name="removecompanyId" id="removecompanyId" value="'+response.company_id+'" /> ');

				// click on remove button to remove the company
				$("#removecompanyBtn").unbind('click').bind('click', function() {
					// button loading
					$("#removecompanyBtn").button('loading');

					$.ajax({
						url: 'php_action/removecompany.php',
						type: 'post',
						data: {companyId : companyId},
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// button loading
							$("#removecompanyBtn").button('reset');
							if(response.success == true) {

								// hide the remove modal 
								$('#removeMemberModal').modal('hide');

								// reload the company table 
								managecompanyTable.ajax.reload(null, false);
								
								$('.remove-messages').html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

			  	  			$(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert
							} else {

							} // /else
						} // /response messages
					}); // /ajax function to remove the company

				}); // /click on remove button to remove the company

			} // /success
		}); // /ajax

		$('.removecompanyFooter').after();
	} else {
		alert('error!! Refresh the page again');
	}
} // /remove companys function