//引入每一个页面所用的js，其实就是每一个模块
var Home = require("./Home");
//var Kind = require("./kind");
//var Cart = require("./Cart");
//var User = require("./User");
//var More = require("./More");
var Foot = require("./Foot");

//引入我们需要的css文件
require("../css/main.scss");
//Home.loadHomeHeader();
//Home.loadHomeContent();

//Kind.loadKindHeader();
//Kind.loadKindContent()

//Cart.loadCartHeader();
//Cart.loadCartContent();

//User.loadUserHeader();
//User.loadUserContent();

//More.loadMoreHeader();
//More.loadMoreContent();

//默认显示我们首页的数据
Home.loadHomeHeader();
Home.loadHomeContent();

Foot.loadFoot();

$("#mask").tap(function(){
	$(this).hide()
})
//
//function Toast(str,time){
//	$("#toast").show();
//	$("#tip").html(str);
//	setTimeout(function(){
//		$("#toast").hide();
//	},time)
//}
