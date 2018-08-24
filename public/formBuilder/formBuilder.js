$(document).ready(function(){
    $("#addField").click(function(){
        var fieldLabel = $( "#field-label-input" ).val();
        var inputName = $( "#input-name" ).val();
        var inputType = $( "#input-type" ).val();

        console.log(fieldLabel + " " + inputName + " " + inputType);

        var markup = "<tr><td>" + fieldLabel + "</td><td>" + inputName + "</td><td>" + inputType + "</td></tr>";
        $("table tbody").append(markup);


    });
});