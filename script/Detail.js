//var str = "我是首页";
//module.exports = str;
var mySwiper;
module.exports = {
	
	loadDetailHeader:function(type,goodsID){
		$("#header").load("html/detail.html #detailHeader",function(){
			console.log("ok")
			$("#back").on("tap",function(){
				if(type == "home"){
					var Home = require("./Home");
					var Foot = require("./Foot");
					Home.loadHomeHeader();
					Home.loadHomeContent();
					Foot.loadFoot()
				}
			})
		})
	},
	loadDetailContent:function(goodsID){
		$("#content").load("html/detail.html #detailContent",function(){
			console.log("ok")
			$("#goodsID").html(goodsID)
			//依据goodsID获取商品的信息
			//http://datainfo.duapp.com/shopdata/getGoods.php
			//goodsID:通过商品ID搜索商品（可选，优先级高）
			
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
				dataType:"jsonp",
				data:{
					goodsID:goodsID
				},
				beforeSend:function(){
					
				},
				success:function(data){
					console.log("detail",data)
					$(".proImg").attr("src",data[0].goodsListImg)
					
					var goodsBenUrlStr = data[0].goodsBenUrl;
					console.log(goodsBenUrlStr)
					var goodsBenUrl = JSON.parse(goodsBenUrlStr);
					var goodsBenUrlLen =  goodsBenUrl.length;
					$("#proWrapper").html("");
					for (var i = 0; i < goodsBenUrlLen; i++) {
						$("#proWrapper").append('<div class="swiper-slide maskImg" imgsrc="'+goodsBenUrl[i]+'"><img src="'+goodsBenUrl[i]+'" alt="" /></div>')
					}
					var proSwiper =new Swiper("#proSwiper",{
						loop:true,
						preventLinksPropagation : false,
						pagination: '.swiper-pagination'
					})
					
					$(".maskImg").doubleTap(function(){
						$("#mask").show();
						$("#mask").find("img").attr("src",$(this).attr("imgsrc"));
					})
				}
			});
			
			mySwiper = new Swiper("#detailSwiper",{
				//抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。
				resistanceRatio:0,
//				loop:true,//不能随意设置，否则你的js复杂度得上升1个世纪
				//当我们的页面切换完毕之后的一个事件
				onSlideChangeEnd: function(swiper){//swiper可以随意更改，但是不建议更改
//				      alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
				      var _index = swiper.activeIndex;
				      $("#footer").find("li").eq(_index).addClass("acive").siblings().removeClass("acive")
				    }
			})
			
			
		})
	},
	loadDetailFooter:function(){
		$("#footer").load("html/detail.html #detailFooter",function(){
			$("#footer").find("li").on("tap",function(){
				var $index = $(this).index();
				mySwiper.slideTo($index, 300, false);//切换到第一个slide，速度为1秒
				$(this).addClass("acive").siblings().removeClass("acive")
			})
		})
	}
}
