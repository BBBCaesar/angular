module.exports = {
	makeText:function(str,time){
		$("#toast").show();
		$("#tip").html(str);
		setTimeout(function(){
			$("#toast").hide();
		},time);
	}
}
