$(function(){
	$(".img").lazyload({
		effect: "fadeIn",
		threshold : 100
	})



//	var HttpLink='http://web.0606.com.cn/active/corps/';
	var HttpLink='http://dev.0606.com.cn:8085/corps/';
	var ids=GetUrlString('ids').split("_");
	var id1=ids[0];  /*兆峰*/
	var id2=ids[1];  /*玉锋*/
	var id3=ids[2];  /*向辉*/
	var id4=ids[3];  /*平崎*/
//	console.log(id1,id2,id3,id4)
	
	

	
	
	
	


	if(GetUrlString("from") !=null && GetUrlString("from").toString().length>1){
		$(".ljdy_crops_buy").click(function(){			
			isInstalled();
			
		})	
		detailsLink("&from=share");
	}else{
		
		var shareValue={
				"title":"【牛人计划】四大王牌战队震撼登场",
				"desc":"牛人战队全天陪伴，一站式解决择时、选股、操作难题。",
				"imageUrl":HttpLink+"images/plan_share_nz.jpg",
				"url":window.location.href+'&from=share',
				"site":"海纳牛牛",
				"siteUrl":window.location.href+'&from=share',
				"titleUrl":window.location.href+'&from=share',
				"shareType":"all"
				};
		share(shareValue);		/*调用分享功能*/
		
		//支付
		var type=99;
		$(".ljdy_crops_buy").click(function(){
			var subscribe_name=$(this).attr("data-subscribe");
			var tokenValue=GetUrlString("access_token");
			if(subscribe_name=='zf'){
				isPaid(id1,tokenValue);
//				payment(id1,type);
				
			}else if(subscribe_name=='yf'){
				isPaid(id2,tokenValue);
//				payment(id2,type);
			}else if(subscribe_name=='xh'){
//				payment(id3,type);
			}else if(subscribe_name=='pq'){
//				payment(id4,type);
			}
		})
		
//		配合ios传参,如果wbversion有值,当点击各个战队时候也要把wbversion传递过去,有wbversion才掉ios分享功能
		if(GetUrlString("wbversion") !=null && GetUrlString("wbversion").toString().length>1){				
			wbversionValue = GetUrlString("wbversion");		
			detailsLink("&wbversion="+wbversionValue);
		}else{
			detailsLink("&");
		}
		
	}

	
	function isPaid(refId,token){
		$.ajax({
			type:"post",		
			url:"http://advisor-dev.0606.com.cn:5510/api/assemble/product?ref_id="+refId+"&access_token="+token,
			dataType:'json',
			data:data,
			success:function(datas){
				document.write(datas)
				if(datas.code==200){
					console.log(datas)
				}else{
					console.log("数据返回错误乱码");
				}
			},
			error:function(e){
				console.log("error")
			}
		});	
	}

	function detailsLink(share){
		$(".link_href").click(function(){
			var plan_name=$(this).attr("data-hrefname");
			if(plan_name=='zf'){
//				plan_name分享时候可以根据这个知道是哪个战队,拿到分享title
//              from:如果是分享出去的页面,那么跳转单个战队需要传值为share,否则不传（分享详情页点击订阅时使用）
				window.location.href=HttpLink+"zfzd.html?plan_name=zf&plan_id="+id1+share;
			}else if(plan_name=="yf"){
				window.location.href=HttpLink+"yfzd.html?plan_name=yf&plan_id="+id2+share;
			}else if(plan_name=='xh'){
				window.location.href=HttpLink+"xhzd.html?plan_name=xh&plan_id="+id3+share;
			}else if(plan_name=='pq'){
				window.location.href=HttpLink+"pqzd.html?plan_name=pq&plan_id="+id4+share;
			}
		})
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
		    window.haina.pushEvent('{"nativecalljs":"topay", "id":"'+id+'","type":99}'); 
			    
			}
	}
		
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
		//alert('{"nativecalljs":"share", "sharevalue":'+value+'}');  
		 window.haina.pushEvent('{"nativecalljs":"share", "sharevalue":'+value+'}'); 	    
			 
		}
	}

	
})
