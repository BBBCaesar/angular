//var str = "我是首页";
//module.exports = str;
//暴露出一个对象，
module.exports = {
	//加载的首页的头部区域
	loadHomeHeader:function(){
		//load()方法去加载我们需要的内容
		$("#header").load("html/home.html #homeHeader",function(){
			console.log("ok")
		})
	},
	//加载的首页的内容区域
	loadHomeContent:function(){
		$("#content").load("html/home.html #homeContent",function(){
//			console.log("ok");
			//ajax请求
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/getBanner.php?callback=",
				dataType:"jsonp",
				beforeSend:function(){
					$("#load").show();
					$("#wrapper").hide();
				},
				success:function(data){
					$("#load").hide();
					$("#wrapper").show();
					var len = data.length;
					//调试数据，获取出第一个中我们要去使用的值
//					console.log(JSON.parse(data[0].goodsBenUrl)[0])
					//清空我们原来的数据
					$("#wrapper").html("");
					//通过for循环和append（）将我们的数据加载到页面上
					for (var i = 0; i < len; i++) {
						$("#wrapper").append('<div class="swiper-slide"><img src="'+JSON.parse(data[i].goodsBenUrl)[0]+'" alt="" /></div>')
					}
					//ajax请求的数据渲染完毕之后再去实例化我们的swiper对象
					var swiper = new Swiper(".swiper-container",{
						autoplay:3000,
						loop:true,
						autoplayDisableOnInteraction:false,
						pagination: '.swiper-pagination'
					})
					
				}
			});
			//请求热推商品
			//http://datainfo.duapp.com/shopdata/getGoods.php
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
				dataType:"jsonp",
				beforeSend:function(){
					
				},
				success:function(data){
//					console.log("proList",data)
//					console.log(data[0]);
					for (var i in data) {
						var name = data[i].goodsName;
						var goodsListImg = data[i].goodsListImg;
						var price = data[i].price;
						var discount = data[i].discount;
						var goodsID = data[i].goodsID;
						var newPrice = 0;
						if(discount == "0"){
							newPrice = price;
							discount = "不打";
						}else{
							//.toFixed(1)取小数点后一位
							newPrice = (price*discount/10).toFixed(1);
						}
						
						$("#proList").append('<li class="proItem" goodsID="'+goodsID+'">'+
							'<div class="proImg">'+
								'<img src="'+goodsListImg+'"/>'+
							'</div>'+
							'<div class="proInfo">'+
								'<p>'+name+'</p>'+
								'<p><span>￥<b>'+newPrice+'</b></span> <del>￥'+price+'</del></p>'+
								'<p>'+discount+'折</p>'+
								'<span class="cartBtn" goodsID="'+goodsID+'"><i class="iconfont">&#xe602;</i></span>'+
							'</div>'+
						'</li>');
					}
					$(".proItem").on("tap",function(){
						var goodsID = $(this).attr("goodsID");
//						alert("detail"+goodsID)
						
						var Detail = require("./Detail");
						//两个参数代表，第一个从哪里来，第二个是哪一个产品
						Detail.loadDetailHeader("home",goodsID);
						//页面内容用哪一个产品
						Detail.loadDetailContent(goodsID);
						//生成我们的底部
						Detail.loadDetailFooter();
					});
					$(".cartBtn").on("tap",function(e){
						e.stopPropagation();
						var goodsID = $(this).attr("goodsID");
//						addCart()
						if(localStorage.getItem("isLogin") == "ok"){
							var userID = localStorage.getItem("userID");
							var AddCart = require("./AddCart");
							AddCart.addCart(userID,goodsID,1);
						}else{
							var Login = require("./Login");
							Login.loadLoginHeader("home");
							Login.loadLoginContent("home");
						}
//						alert("cart"+goodsID)
					})
				}
			});
			
			
			
			
			
			
			
			
			
			
		})
	}
}
