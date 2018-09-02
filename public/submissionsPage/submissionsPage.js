$(document).ready(function(){
	var urlParams = new URLSearchParams(window.location.search);
	var fieldId = urlParams.get('fieldID');

    ajaxGet();
	
	function ajaxGet(){
		$.ajax({
			type : "GET",
			url : '/setSubmissionsTable?fieldID=' + fieldId,
			success: function(submissions){
				$.each(submissions, function(i, submission){
					if (i == "_id") return;
					var formRow = '<tr> <th> </th>';
					var rows = [];

					for (var name in submission) {
						formRow += '<th>' + name + '</th>';
						for (var i = 0; i < submission[name].length; i++)
						{
							rows[i] += '<td>' + submission[name][i] + '</td>';
						}
					}
					formRow += '</tr>';
					$('#submissionsTable thead').append(formRow);

					for (var i = 0; i < rows.length; i++) {
						var id = i+1;
						$('#submissionsTable tbody').append('<tr> <td> ' + id + '</td>' + rows[i] + '</tr>');						
					}
				}
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});	
	}
});