//var str = "我是首页";
//module.exports = str;
module.exports = {
	loadUserHeader:function(){
		$("#header").load("html/user.html #userHeader",function(){
			console.log("ok")
		})
	},
	loadUserContent:function(){
		$("#content").load("html/user.html #userContent",function(){
			console.log("ok");
			
			if(localStorage.getItem("isLogin") == "ok"){
				$(".userBtn").hide();
				$(".nike").html(localStorage.getItem("userID"));
			}
			$(".loginBtn").tap(function(){
				var Login = require("./Login");
				Login.loadLoginHeader("user");
				Login.loadLoginContent("user");
			});
			$(".registerBtn").tap(function(){
				var Register = require("./Register");
				Register.loadRegisterHeader();
				Register.loadRegisterContent();
			});
		});
	}
}
