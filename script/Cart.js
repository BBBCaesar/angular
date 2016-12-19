//var str = "我是首页";
//module.exports = str;
module.exports = {
	loadCartHeader:function(){
		$("#header").load("html/cart.html #cartHeader",function(){
			console.log("ok");
			$(".toEdit").tap(function(){
				var CartEdit = require("./CartEdit");
				CartEdit.loadCartEditHeader();
				CartEdit.loadCartEditContent();
			});
			$(".pay").tap(function(){
//				alert("结算成功");
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/getCar.php?callback=",
					data:{
						userID:localStorage.getItem("userID")
					},
					dataType:"jsonp",
					success:function(data){
//						var Toast = require("./Toast");
//						Toast.makeText("支付成功",1000);
						var orderList = JSON.stringify(data);
						localStorage.setItem("orderList",orderList);
						var userID = localStorage.getItem("userID");
						for(var i in data){
							var goodsID = data[i].goodsID;
							var AddCart = require("./AddCart");
							AddCart.addCart(userID,goodsID,0,"pay");
						}
					}
				});
			});
		});
	},
	loadCartContent:function(){
		$("#content").load("html/cart.html #cartContent",function(){
			console.log("ok");
			
			//请求数据
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/getCar.php?callback=",
				data:{
					userID:localStorage.getItem("userID")
				},
				dataType:"jsonp",
				success:function(data){
					console.log("cart",data)
					if(data == "0"){
						$(".toEdit").hide();
						$(".pay").hide();
						$("#cartList").html("购物车空空如也,<p id='goShop' style='color:#f66'>去购物</p>");
						$("#goShop").tap(function(){
							var Home = require("./Home");
							Home.loadHomeHeader();
							Home.loadHomeContent();
							$("#footer").find("li").eq(0).addClass("acive").siblings().removeClass("acive")
						});
					}else{
						$(".toEdit").show();
						$(".pay").show();
						$("#cartList").html("")
						for (var i in data) {
							var img = data[i].goodsListImg;
							var goodsID = data[i].goodsID;
							var name = data[i].goodsName;
							var price = data[i].price;
							var className = data[i].className;
							var number = data[i].number;
							var newPrice = 0;
							if(data[i].discount == "0"){
								newPrice = price;
							}else{
								newPrice = (price*data[i].discount/10).toFixed(1);
							}
							
							$("#cartList").append('<li class="cartItem">'+
								'<div class="deleteItem" goodsID="'+goodsID+'">'+
									'删除'+
								'</div>'+
								'<div class="itemBox">'+
									'<div class="itemImg">'+
										'<img src="'+img+'"/>'+
									'</div>'+
									'<div class="itemInfo">'+
										'<p>'+name+'</p>'+
										'<p>'+className+'</p>'+
										'<p>单价：￥'+newPrice+'</p>'+
										'<p>数量：'+number+'</p>'+
									'</div>'+
								'</div>'+
							'</li>')
						}
					}
					
					$(".cartItem").swipeLeft(function(e){
						console.log(e.target.scrollWidth)
						$(this).find(".itemBox").animate({
							"right":"1.2rem"
						},300).parent('.cartItem').siblings().find(".itemBox").animate({
							"right":"0rem"
						},300)
					});
					$(".cartItem").swipeRight(function(){
						$(this).find(".itemBox").animate({
							"right":"0rem"
						},300)
					});
					$(".deleteItem").tap(function(){
//						alert("删除成功");
						var userID = localStorage.getItem("userID");
						var goodsID = $(this).attr("goodsID");
						var AddCart = require("./AddCart");
						AddCart.addCart(userID,goodsID,0,"delete");
						
					})
				}
			});
			
			
			
		});
	}
}
