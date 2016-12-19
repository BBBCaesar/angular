//var str = "我是首页";
//module.exports = str;
module.exports = {
	loadMoreHeader:function(){
		$("#header").load("html/more.html #moreHeader",function(){
			console.log("ok");
		});
	},
	loadMoreContent:function(){
		$("#content").load("html/more.html #moreContent",function(){
			console.log("ok")
			$("#cancel").tap(function(){
				localStorage.setItem("isLogin","error");
			});
		});
	}
}
