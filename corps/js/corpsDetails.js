      var HttpLink='http://web.0606.com.cn/active/corps/';
//	var HttpLink='http://dev.0606.com.cn:8085/corps/';
$(function(){
	$("img").lazyload({
		effect: "fadeIn",
		threshold : 0
	});
	
	if(GetUrlString("from") !=null && GetUrlString("from").toString().length>1){
		$(".subscribe").click(function(){			
			isInstalled();
		})	
	}else{
		var planName=GetUrlString("plan_name");
		if(planName !=null && planName.toString().length>1){
			if(planName=='zf'){
				planName='理想荣耀战队';
			}else if(planName=='yf'){
				planName='寻龙点穴战队';
			}else if(planName=='xh'){
				planName='永恒战队';
			}else if(planName=='pq'){
				planName='黑马狙击战队';
			}else if(planName=="juejin"){
				planName='掘金战队';
			}else if(planName=='jyyf'){
				planName="金益赢富战队";
			}else if(planName=="jzbj"){
				planName="价值掘金战队";
			}
		}else{
			var planName=GetUrlString("四大王牌战队年中钜惠");
		}
		//  分享-s
		var shareValue={
				"title":"【牛人计划】"+planName,
				"desc":"牛人战队全天陪伴，一站式解决择时、选股、操作难题。",
				"imageUrl":HttpLink+"images/plan_share_nz.jpg",
				"url":window.location.href+'&from=share',
				"site":"海纳牛牛",
				"siteUrl":window.location.href+'&from=share',
				"titleUrl":window.location.href+'&from=share',
				"shareType":"all"
				};
		share(shareValue);
		
		//	支付
		var id=GetUrlString("plan_id");
		
		var type=99;
		
		$(".subscribe").click(function(){	
			
			var token=GetUrlString("access_token");
			if(token==''||token=='(null)'||!token){
				refreshtoken();
			}			
			
			isPaid(id,token);
			
		})
	}



//	是否购买过此产品
	function isPaid(id,token){
		
		$.ajax({
			type:"get",		
//			url:"http://advisor-dev.0606.com.cn:5510/api/assemble/product?ref_id="+id+"&access_token="+token,
			url:"http://advisor.0606.com.cn:80/api/assemble/product?ref_id="+id+"&access_token="+token,
			dataType:'json',
			success:function(datas){
				console.log(datas)
				
				
				if(datas.code==200){
//					已购买过为true，提示已经购买过

					if(datas.data[0].is_paid){
					
						$(".tsPrompt").fadeIn();
						setTimeout(function(){
							$(".tsPrompt").fadeOut();
						},1500)
					}else{
						
//						refId就是战队id
						payment(id,type);/*未购买过跳转支付*/
					}
				}else{
					console.log("数据返回错误乱码");
				}
				
			},
			error:function(e){
				console.log("error")
			}
		});	
	}


function refreshtoken(){
	if (typeof window.webkit != 'undefined') {					
	    window.webkit.messageHandlers.jsCallNative.postMessage({"nativeCallJS":"refreshtoken_reload"});
	}else {				       //android
	    window.haina.pushEvent('{"nativecalljs":"refreshtoken_reload"}'); 	 
	}
}
	
function isInstalled(){
    var schemeUrl = "ihayner://homepage:10002";
    window.location.href=schemeUrl;//打开某手机上的某个app应用
    setTimeout(function(){
        window.location="http://web.0606.com.cn/active/download/download.html";
    },1000);
}

function payment(id,type){
	
	if (typeof window.webkit != 'undefined') {
		//ios
		//传值:1订单GUID,2产品关联类型：（1.锦囊包、2.直播聊天、3.图文直播、4.研报、7.会员升级）
	    window.webkit.messageHandlers.jsCallNative.postMessage({"nativeCallJS":"topay","ref_id":id,"ref_type":type});
	}else {
	       //android
	    window.haina.pushEvent('{"nativecalljs":"topay", "id":"'+id+'","type":'+type+' }'); 
	    
	}
	}
});
function GetUrlString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


function share(shareValue){
	if (typeof window.webkit != 'undefined') {
		if(GetUrlString("wbversion") !=null && GetUrlString("wbversion").toString().length>1){
			//ios				
			window.webkit.messageHandlers.jsCallNative.postMessage({"nativeCallJS":"share","sharevalue":shareValue});
		}
	    
	}else {
	       //android
	var value= JSON.stringify(shareValue);  
	 window.haina.pushEvent('{"nativecalljs":"share", "sharevalue":'+value+'}'); 	    
		 
	}
}
