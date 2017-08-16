/**
 * Created by Administrator on 2017/8/4 0004.
 */
// JavaScript Document
function setTab(name,num,n){
    for(i=1;i<=n;i++){
        var menu=document.getElementById(name+i);
        var con=document.getElementById(name+"_"+"con"+i);
        menu.className=i==num?"active":"";
        con.style.display=i==num?"block":"none";
    }
}
//colsedpop
function colsedpop (obj){
    $(obj).parents('.lsM_box').hide()
}
