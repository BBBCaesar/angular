//var str = "我是首页";
//module.exports = str;
module.exports = {
	toLogin:function(userID,password,type){
//		alert("dadasdasdsa")
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				"status":"login",
				"userID":userID,
				"password":password
			},
			beforeSend:function(){
				
			},
			success:function(data){
				var Toast = require("./Toast");
				console.log(data)
				if(data == "0"){
					Toast.makeText("用户名不存在",3000);
				}else if(data=="2"){
					Toast.makeText("密码错误",3000);
				}else{
					localStorage.setItem("isLogin","ok");
					localStorage.setItem("userID",userID);
					
					if(type == "user"){
						var User = require("./User");
						User.loadUserHeader();
						User.loadUserContent();
					}else if(type == "home"){
							var Home = require("./Home");
							Home.loadHomeHeader();
							Home.loadHomeContent();
						}else if(type == "cart"){
							var Cart = require("./Cart");
							Cart.loadCartHeader();
							Cart.loadCartContent();
						}
				}
			}
		});
	},
	loadLoginHeader:function(type){
		
		$("#header").load("html/login.html #loginHeader",function(){
			console.log("ok")
			$(".toRegisterBtn").tap(function(){
				var Register = require("./Register");
				Register.loadRegisterHeader("login");
				Register.loadRegisterContent();
			});
			$("#back").on("tap",function(){
				if(type == "user"){
					var User = require("./User");
					User.loadUserHeader();
					User.loadUserContent();
				}else if(type == "home"){
					var Home = require("./Home");
					Home.loadHomeHeader();
					Home.loadHomeContent();
					$("#footer").find("li").eq(0).addClass("acive").siblings().removeClass("acive")
				}else if(type == "cart"){
					var Home = require("./Home");
					Home.loadHomeHeader();
					Home.loadHomeContent();
					$("#footer").find("li").eq(0).addClass("acive").siblings().removeClass("acive")
				}
			})
		})
	},
	loadLoginContent:function(type){
		var that = this;
		$("#content").load("html/login.html #loginContent",function(){
			console.log("ok")
				$("#login").tap(function(){
				var Toast = require("./Toast");
				var userID = $("#userID").val();
				var password = $("#password").val();
				if(userID == ""){
					Toast.makeText("用户名不能为空",3000);
				}else{
					if(password == ""){
						Toast.makeText("密码不能为空",3000);
					}else{
						that.toLogin(userID,password,type);
					}
				}
			});
		})
	}
}
