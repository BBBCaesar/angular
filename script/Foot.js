//var str = "我是首页";
//module.exports = str;
module.exports = {
	loadFoot:function(){
		$("#footer").load("html/foot.html",function(){
			console.log("ok")
			var Home = require("./Home");
			var Kind = require("./kind");
			var Cart = require("./Cart");
			var User = require("./User");
			var More = require("./More");
			//点击底部导航显示不同的区域---------路由
			$("#footer").find("li").on("tap",function(){
				var $index = $(this).index();
				$(this).addClass("acive").siblings().removeClass("acive");
				switch ($index){
					case 0:
					
						Home.loadHomeHeader();
						Home.loadHomeContent();
						break;
					case 1:
						Kind.loadKindHeader();
						Kind.loadKindContent();
						break;
					case 2:
						if(localStorage.getItem("isLogin") == "ok"){
							var userID = localStorage.getItem("userID");
							Cart.loadCartHeader();
							Cart.loadCartContent();
							
						}else{
							var Login = require("./Login");
							Login.loadLoginHeader("cart");
							Login.loadLoginContent("cart");
						}
					
						
						break;
					case 3:
						User.loadUserHeader();
						User.loadUserContent();
						break;
					case 4:
						More.loadMoreHeader();
						More.loadMoreContent();
						break;
					default:
						break;
				}
			});

		})
	}
}
