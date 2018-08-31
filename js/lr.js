var login=$("#login")
var login_form=$(".login-form")
var register=$("#register")
var register_form=$(".register-form")
var lr=$("#lr span")
console.log(lr)
lr.bind("click",function(e){
    let data=$(e.target).text()
    if(data==="登录"){
        register.removeClass("active")
        login.addClass("active")
        register_form.hide()
        login_form.show()
    }
    if(data==="注册"){
        login.removeClass("active")
        register.addClass("active")
        login_form.hide()
        register_form.show()

    }

})

/*canvas绘制验证码*/
cnvCode()
$("#freshCode").bind("click",function () {
    cnvCode()
})

//绘制随机验证码
function cnvCode() {
    //1.新建一个函数产生随机数
    function rn(min,max){
        return  parseInt(Math.random()*(max-min)+min);
    }
//2.新建一个函数产生随机颜色
    function rc(min,max){
        var r=rn(min,max);
        var g=rn(min,max);
        var b=rn(min,max);
        return `rgb(${r},${g},${b})`;
    }
//3.填充背景颜色,颜色要浅一点
    var w=80;
    var h=30;
    var ctx=c1.getContext("2d");
    ctx.fillStyle=rc(180,230);
    ctx.fillRect(0,0,w,h);
//4.随机产生字符串
    var pool="ABCDEFGHIJKLIMNOPQRSTUVWSYZ1234567890";
    for(var i=0;i<4;i++){
        var c=pool[rn(0,pool.length)];//随机的字
        var fs=rn(18,30);//字体的大小
        var deg=rn(-30,30);//字体的旋转角度
        ctx.font=fs+'px Simhei';
        ctx.textBaseline="top";
        ctx.fillStyle=rc(80,150);
        ctx.save();
        ctx.translate(20*i+15,15);
        ctx.rotate(deg*Math.PI/180);
        ctx.fillText(c,-15+5,-15);
        ctx.restore();
    }
//5.随机产生5条干扰线,干扰线的颜色要浅一点
    for(var i=0;i<5;i++){
        ctx.beginPath();
        ctx.moveTo(rn(0,w),rn(0,h));
        ctx.lineTo(rn(0,w),rn(0,h));
        ctx.strokeStyle=rc(180,230);
        ctx.closePath();
        ctx.stroke();
    }
//6.随机产生40个干扰的小点
    for(var i=0;i<40;i++){
        ctx.beginPath();
        ctx.arc(rn(0,w),rn(0,h),1,0,2*Math.PI);
        ctx.closePath();
        ctx.fillStyle=rc(150,200);
        ctx.fill();
    }
}
