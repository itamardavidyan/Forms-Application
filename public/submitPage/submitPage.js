$(document).ready(function(){
	var inputSum = 0;
	var urlParams = new URLSearchParams(window.location.search);
	var fieldId = urlParams.get('fieldID');
	var fields;

	ajaxGet();
	
	function ajaxGet(){
		$.ajax({
			type : "GET",
			url : '/setForm?fieldID=' + fieldId,
			success: function(result){
				fields = result.fields;
				$("#formTitle").append('"' + result.form_name + '"');
				$.each(fields, function(fieldName, field){
					var formRow = '<form class="form-inline">' + 
									'<div class="form-group">' + 
										'<label>' + field.fieldLabel + ':</label>' + 
										'<input type="' + field.inputType + '" class="form-control" id="' + fieldName + '">' + 
										'</div>' +
							   	  '</form>';
					$('#formInit').append(formRow);
					inputSum++;
		        });
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});	
	}


    $("#send").click(function(){
		const captcha = document.querySelector('#g-recaptcha-response').value;

    	var jsonObjInputName = {

		}

		$.each(fields, function(fieldName, field){
			var inputVal = $( "#" + fieldName ).val();
			var inputName = field.inputName;
	        jsonObjInputName[inputName] = inputVal;
		});

		fetch('/send', {
			method:'POST',
			headers: {
			  'Accept': 'application/json, text/plain, */*',
			  'Content-type':'application/json'
			},
			body:JSON.stringify({fieldID:fieldId, answer: JSON.stringify(jsonObjInputName), captcha: captcha})
		})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			alert(data.msg);
		});


    	// $.post("/send",{ fieldID: fieldId , answer: JSON.stringify(jsonObjInputName) }, function(data){

		// });
	});

});
