//var str = "我是首页";
//module.exports = str;
module.exports = {
	loadCartEditHeader:function(){
		$("#header").load("html/cartEdit.html #cartEditHeader",function(){
			console.log("ok");
			$(".finishBtn").tap(function(){
				var Cart = require("./Cart");
				Cart.loadCartHeader();
				Cart.loadCartContent();
				console.log("totalNum",localStorage.getItem("totalNum"));
				console.log("totalPrice",localStorage.getItem("totalPrice"));
			});
		});
	},
	loadCartEditContent:function(){
		$("#content").load("html/cartEdit.html #cartEditContent",function(){
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
					$("#cartList").html("")
					var totalNum = 0;
					var totalPrice = 0; 
					for (var i in data) {
						var img = data[i].goodsListImg;
						var goodsID = data[i].goodsID;
						var name = data[i].goodsName;
						var price = data[i].price;
						var number = data[i].number;
						totalNum+=number*1;
						localStorage.setItem("totalNum",totalNum);
						var newPrice = 0;
						if(data[i].discount == "0"){
							newPrice = price*1;
						}else{
							newPrice = (price*data[i].discount/10).toFixed(1);
						}
						totalPrice += number*newPrice;
						localStorage.setItem("totalPrice",totalPrice);
						$("#cartList").append('<li class="cartItem">'+
							'<div class="itemImg">'+
								'<img src="'+img+'"/>'+
							'</div>'+
							'<div class="itemInfo">'+
								'<p>'+name+'</p>'+
								'<p>单价：<span>￥'+newPrice+'</span></p>'+
								'<p><span class="reduce" goodsID="'+goodsID+'" newPrice="'+newPrice+'">-</span><span id="pro'+goodsID+'">'+number+'</span><span class="add" goodsID="'+goodsID+'" newPrice="'+newPrice+'">+</span></p>'+
							'</div>'+
						'</li>');
					}
					
					$(".reduce").tap(function(){
						var goodsID = $(this).attr("goodsID");
						var newPrice = $(this).attr("newPrice");
						var num = $("#pro"+goodsID).html()*1;
						if(num == 1){
							var Toast = require("./Toast");
							Toast.makeText("至少选一个",1000);
						}else{
							num--;
							totalNum-=1;
							$("#pro"+goodsID).html(num);
							totalPrice -= newPrice;
							localStorage.setItem("totalNum",totalNum);
							localStorage.setItem("totalPrice",totalPrice);
							var userID = localStorage.getItem("userID");
							var AddCart = require("./AddCart");
							AddCart.addCart(userID,goodsID,num);
						}
					});
					$(".add").tap(function(){
						var newPrice = $(this).attr("newPrice");
						var goodsID = $(this).attr("goodsID");
						var num = $("#pro"+goodsID).html()*1;
						if(num == 5){
							var Toast = require("./Toast");
							Toast.makeText("不能再多了",1000);
						}else{
							num++;
							totalNum-=(-1);
							$("#pro"+goodsID).html(num);
							totalPrice -= -newPrice;
							localStorage.setItem("totalNum",totalNum);
							localStorage.setItem("totalPrice",totalPrice);
							var userID = localStorage.getItem("userID");
							var AddCart = require("./AddCart");
							AddCart.addCart(userID,goodsID,num);
						}
					});
				}
			});
			
		});
	}
}
