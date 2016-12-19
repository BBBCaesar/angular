//var str = "我是首页";
//module.exports = str;
module.exports = {
	toRegister:function(userID,password){
//		alert("dadasdasdsa")
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				"status":"register",
				"userID":userID,
				"password":password
			},
			beforeSend:function(){
				
			},
			success:function(data){
				console.log(data)
			}
		});
	},
	loadRegisterHeader:function(type){
		$("#header").load("html/register.html #registerHeader",function(){
			console.log("ok");
			$(".toLoginBtn").tap(function(){
				var Login = require("./Login");
				Login.loadLoginHeader("user");
				Login.loadLoginContent();
			});
			$("#back").on("tap",function(){
				var User = require("./User");
				User.loadUserHeader();
				User.loadUserContent();
			})
		})
	},
	loadRegisterContent:function(){
		var that = this;
		$("#content").load("html/register.html #registerContent",function(){
			console.log("ok");
			$("#register").tap(function(){
				var Toast = require("./Toast");
				var userID = $("#userID").val();
				var password = $("#password").val();
				var password1 = $("#password1").val();
				if(userID == ""){
					Toast.makeText("用户名不能为空",3000);
				}else{
					if(password == ""){
						Toast.makeText("密码不能为空",3000);
					}else{
						if(password1 != password){
							Toast.makeText("密码不一致",3000);
						}else{
							Toast.makeText("可以注册啦",3000);
							//进行ajax请求
							that.toRegister(userID,password);
						}
					}
				}
			});
		})
	},
	
}
