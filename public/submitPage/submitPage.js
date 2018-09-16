var vaild = false;

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
		// validateform();
    	var jsonObjInputName = {

		}

		$.each(fields, function(fieldName, field){
			var inputVal = $( "#" + fieldName ).val();
			var inputName = field.inputName;
	        jsonObjInputName[inputName] = inputVal;
		});
		// alert(vaild);
    	$.post("/send",{vaildRe: vaild , fieldID: fieldId , answer: JSON.stringify(jsonObjInputName) }, function(data){

		});
	});

});

// function validateform(){
// 	var captcha_response = grecaptcha.getResponse();
// 		if(captcha_response.length == 0 || grecaptcha != undefined )
// 		{
// 			// Captcha is not Passed
// 			alert('  Please verify you are not a robot.');
// 		}else{
// 			$.get('/captchaTest',{'response':captcha_response},function(response){
// 				if(response == undefined && response.responseCode == undefined && response.responseDesc == undefined  && response.responseCode !== 0 && response.responseDesc !== 'Sucess' ){
// 					alert('  Youre a robot.');
// 				}
// 				grecaptcha.reset();
// 			});
// 		}
// }

function recaptcha_callback(){
	// alert("callback working");
	vaild = true;
}

