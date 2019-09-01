$(document).ready(function(){
    var from,to,name,text;
    $("#btnContactUs").click(function(){
        to="webgheldaw2019@outlook.es";
        name=$("#name").val();
        text=$("#message").val();
        $("#mensaje").text("Enviando E-mail...Porfavor espere");
        $.get("http://localhost:3000/contact.html/send",{to:to,subject:name,text:text},function(data){
      		if(data=="sent")
      		{
      			$("#mensaje").empty().html("<p>Email ha sido enviado a "+to+" . Porfavor revisar inbox !</p>");
      		}
        });
    });
});
