var jsonObjFields = {

}
var jsonObjInputName = {

}
var fieldNum = 1;

$(document).ready(function(){
    $("#addField").click(function(){
        var fieldLabelVal = $( "#field-label-input" ).val();
        var inputNameVal = $( "#input-name" ).val();
        var inputTypeVal = $( "#input-type" ).val();

        var newField = "field" + fieldNum;
		var myObj = { fieldLabel: fieldLabelVal, inputName: inputNameVal, inputType: inputTypeVal};
        jsonObjFields[newField] = myObj;
        jsonObjInputName[inputNameVal] = [];

        fieldNum++;

        var markup = "<tr><td>" + fieldLabelVal + "</td><td>" + inputNameVal + "</td><td>" + inputTypeVal + "</td></tr>";
        $("table tbody").append(markup);
    });

    $("#save").click(function(){
    	var formName = $('#form-name-input').val();
    	$.post("/save",{formname: formName, tabledata: JSON.stringify(jsonObjFields), inputNames: JSON.stringify(jsonObjInputName) }, function(data){

		});
    });
});