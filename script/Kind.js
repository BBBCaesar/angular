//var str = "我是首页";
//module.exports = str;
module.exports = {
	loadKindHeader:function(){
		$("#header").load("html/kind.html #kindHeader",function(){
			console.log("ok1")
		})
	},
	loadKindContent:function(){
		$("#content").load("./html/kind.html #kindContent",function(){
			console.log("ok12")
		})
	}
}
