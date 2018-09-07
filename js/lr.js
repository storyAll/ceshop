$(function () {
    var login = $("#login")
    var login_form = $(".login-form")
    var register = $("#register")
    var register_form = $(".register-form")
    var lr = $("#lr span")
    var code=''
    var flag='true'
    var user_tk=''
    var ps_tk=''
    var login_user_tk=""
    var login_ps_tk=""
    var v_tk=''
    var msg_code=""
    var time=30;
    var person=0;
    const uPattern = /^[a-zA-Z0-9_-]{6,16}$/;
    const mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    lr.bind("click", function (e) {
        $("#msg_login").text("")
        $("#msg_register").text("")
        let data = $(e.target).text()
        if (data === "登录") {
            register.removeClass("active")
            login.addClass("active")
            register_form.hide()
            login_form.show()
        }
        if (data === "注册") {
            login.removeClass("active")
            register.addClass("active")
            login_form.hide()
            register_form.show()
        }

    })
    /*canvas绘制验证码*/
    cnvCode(flag)
    $("#freshCode").bind("click", function () {
        flag='false'
        cnvCode(flag)
    })
    //绘制随机验证码
    async function cnvCode(flag) {
        var f=hex_md5(flag)
        // 验证码获取
        await  $.ajax(
            {
                type: 'get',
                async:false,
                url: 'http://192.168.0.115:8080/ycweb/user/vtoken.do?flag='+f,
                dataType: 'jsonp',
                jsonpCallback: "callback",
                success: function (data) {
                    code=data[0].value
                    v_tk=data[0].token
                    console.log(data)

                },
                error: function (error) {
                    console.log(error)
                }
            }
        );
        //1.新建一个函数产生随机数
        function rn(min, max) {
            return parseInt(Math.random() * (max - min) + min);
        }

//2.新建一个函数产生随机颜色
        function rc(min, max) {
            var r = rn(min, max);
            var g = rn(min, max);
            var b = rn(min, max);
            return `rgb(${r},${g},${b})`;
        }

//3.填充背景颜色,颜色要浅一点
        var w = 90;
        var h = 30;
        var ctx = c1.getContext("2d");
        ctx.fillStyle = rc(180, 230);
        ctx.fillRect(0, 0, w, h);
//4.随机产生字符串
        for (var i = 0; i < 6; i++) {
            var fs = rn(16, 26);//字体的大小
            var deg = rn(-30, 30);//字体的旋转角度
            ctx.font = fs + 'px Simhei';
            ctx.textBaseline = "top";
            ctx.fillStyle = rc(80, 150);
            ctx.save();
            ctx.translate(13 * i + 15, 15);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(code[i], -15 + 5, -15);
            ctx.restore();
        }
/*5.随机产生5条干扰线,干扰线的颜色要浅一点
        for (var i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(rn(0, w), rn(0, h));
            ctx.lineTo(rn(0, w), rn(0, h));
            ctx.strokeStyle = rc(180, 230);
            ctx.closePath();
            ctx.stroke();
        }*/
//6.随机产生40个干扰的小点
        for (var i = 0; i < 30; i++) {
            ctx.beginPath();
            ctx.arc(rn(0, w), rn(0, h), 1, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = rc(150, 200);
            ctx.fill();
        }
    }

    /*登录验证*/
    var lg = $("#lg")
    $("#username").blur(function () {
        $("#msg_login").text("")
        if(!uPattern.test($("#username").val())){
            $("#msg_login").text("账户6-16位数字字母或_-")
        }else{
            $.ajax(
                {
                    type: 'get',
                    url: 'http://192.168.0.115:8080/ycweb/user/addps.do?userName='+$("#username").val()+'&password='+'',
                    dataType: 'jsonp',
                    jsonpCallback: "callback",
                    success: function (data) {
                        login_user_tk=data[0].value

                        console.log(login_user_tk)
                    },
                    error: function (error) {
                        console.log(error)
                    }
                }
            );
        }
    })
    $("#password").blur(function () {
        $("#msg_login").text("")
        if(!uPattern.test($("#password").val())){
            $("#msg_login").text("密码6-16位数字字母或_-")
        }else{
            $.ajax(
                {
                    type: 'get',
                    url: 'http://192.168.0.115:8080/ycweb/user/addps.do?userName='+''+'&password='+$("#password").val(),
                    dataType: 'jsonp',
                    jsonpCallback: "callback",
                    success: function (data) {
                        login_ps_tk=data[0].value

                        console.log(login_ps_tk)

                    },
                    error: function (error) {
                        console.log(error)
                    }
                }
            );
        }
    })

    if (getCookie("ce_username")!=null){
        $("#username").val(getCookie("ce_username"))
        $("#password").val(getCookie("ce_password"))
        $("#remeber").prop("checked","checked")
    }
    lg.bind('click', function () {
        if ($("#username").val() == "" || $("#password").val() == "" || !uPattern.test($("#password").val()) || !uPattern.test($("#username").val())) {
            $("#msg_login").text("账号或密码不正确")
            return
        }
        if($("#remeber").prop("checked")){
            setCookie("ce_username",$("#username").val())
            setCookie("ce_password",$("#password").val())
        }else{
            delCookie("ce_username")
            delCookie("ce_password")
        }
        $.ajax(
            {
                type: 'get',
                url: 'http://192.168.0.115:8080/ycweb/user/login.do?userName=' + login_user_tk + '&password=' + login_ps_tk,
                dataType: 'jsonp',
                jsonpCallback: "login_callback",
                success: function (data) {
                    if (data[0].value=="true") {
                        window.location.href="./index.html"
                    }else{
                        $("#msg_login").text("登录失败请重新登录")
                    }
                },
                error: function (error) {
                    console.log(error)
                }
            }
        );
    })





  /* 注册验证*/
    //预加密接口
    //用户名加密
    $("#register_user").blur(function () {
        if(!uPattern.test($("#register_user").val())){
            $("#msg_register").text("请输入6-12位用户名数字字母或_-")
            return
        }
        if($("#register_user").val()!=""){
            $("#msg_register").text("")
            $.ajax(
                {
                    type: 'get',
                    url: 'http://192.168.0.115:8080/ycweb/user/addps.do?userName='+$("#register_user").val()+'&password='+'',
                    dataType: 'jsonp',
                    jsonpCallback: "callback",
                    success: function (data) {
                        user_tk=data[0].value

                        console.log(user_tk)

                    },
                    error: function (error) {
                        console.log(error)
                    }
                }
            );
        }
    })
    $("#register_ps").blur(function () {
        if (!uPattern.test($("#register_ps").val())) {
            $("#msg_register").text("请输入6-12位密码数字字母或_-")
        }
    })
    //密码加密
    $("#repeat_ps").blur(function () {
        if($("#register_ps").val()=="" ||
            $("#repeat_ps").val()=="" ||
            $("#register_ps").val()!=$("#repeat_ps").val()){
            $("#msg_register").text("密码不能为空或两次密码不一致")
            return
        }
        if($("#register_user").val()!="" &&
            $("#register_ps").val()!="" &&
            $("#repeat_ps").val()!="" &&
            $("#register_ps").val()==$("#repeat_ps").val()){
            $("#msg_register").text("")
            $.ajax(
                {
                    type: 'get',
                    url: 'http://192.168.0.115:8080/ycweb/user/addps.do?userName='+''+'&password='+$("#repeat_ps").val(),
                    dataType: 'jsonp',
                    jsonpCallback: "callback",
                    success: function (data) {
                        ps_tk=data[0].value

                        console.log(ps_tk)

                    },
                    error: function (error) {
                        console.log(error)
                    }
                }
            );
        }
    })
    //手机号查询
    $("#cellphone").blur(function () {
        var cellphone=$("#cellphone").val()
        if (!mPattern.test(cellphone)) {
            $("#msg_register").text("请输入正确的手机号码")
            return
        }
        $.ajax(
            {
                type: 'get',
                url: `http://192.168.0.115:8080/ycweb/user/IsNot_Login.do?userName=${user_tk}&phone=${cellphone}`,
                dataType: 'jsonp',
                jsonpCallback: "callback",
                success: function (data) {
                    if (data[0].value=='false'){
                        $("#msg_register").text("")
                    } 
                    if(data[0].value=='true'){
                        $("#msg_register").text("该手机号已存在请重新输入")
                    }
                    console.log(data[0].value)

                },
                error: function (error) {
                    console.log(error)
                }
            }
        );
    })

    //验证码判断

    $("#img_code").blur(function () {
        var img_code=$("#img_code").val()
        if(img_code.toLocaleLowerCase() !=code.toLocaleLowerCase()){
            $("#msg_register").text("图片验证码错误")
        }else{
            $("#msg_register").text("")
        }
    })
    //获取手机验证码
    $("#code_text").bind('click',function () {
        var phone=$("#cellphone").val()
        var vcode=code
        var key=hex_md5(phone+vcode)
        var vtoken=v_tk
            $.ajax(
                {
                    type: 'get',
                    url: `http://192.168.0.115:8080/ycweb/user/vmessage.do?phone=${phone}&code=${vcode}&key=${key}&token=${vtoken}`,
                    dataType: 'jsonp',
                    jsonpCallback: "callback",
                    success: function (data) {
                        var status=data[0].value
                        if(status=="true"){
                            msg_code=data[0].code
                           var t= setInterval(function () {

                                $("#code_text").html(`<a  href="javascript:void 0">${time}s后重新获取</a>`)
                                time--;
                                if(time==0){
                                    time=30
                                    $("#code_text").html(`<a  href="javascript:void 0">获取验证码</a>`)
                                    clearTimeout(t)
                                }
                            },1000)

                        }else{
                            $("#msg_register").text("短信验证码获取失败")
                        }
                        console.log(data[0])
                    },
                    error: function (error) {
                        console.log(error)
                    }
                }
            );
    })
    //手机验证码
    $("#msg_code").blur(function () {
        if ($("#msg_code").val() != msg_code) {
            $("#msg_register").text("短信验证码不正确")
        }else{
            $("#msg_register").text("")
        }
    })

    $("#sign_up").bind('click',function(){
        if( !uPattern.test($("#register_user").val())||
            !uPattern.test($("#register_ps").val()) ||
            !uPattern.test($("#repeat_ps").val()) ||
            $("#msg_code").val() =="" ||
            $("#img_code").val() =="" ||
            $("#cellphone").val() =="" ||
            !$("#agree").is(":checked")){
                $("#msg_register").text("请补全注册信息")
                return

        }
        var phone=$("#cellphone").val()
         $("#private").is(":checked")? person=0 :person=1
        $.ajax(
            {
                type: 'get',
                url: `http://192.168.0.115:8080/ycweb/user/addUser.do?userName=${user_tk}&password=${ps_tk}&phone=${phone}&code=${msg_code}&person=${person}`,
                dataType: 'jsonp',
                jsonpCallback: "callback",
                success: function (data) {
                   if(data[0].value =="true"){
                       $("#msg_register").text("注册成功请登录")
                   }else{
                       $("#msg_register").text("注册失败请重新注册")
                   }


                },
                error: function (error) {
                    console.log(error)
                }
            }
        );

    })

    function setCookie(name,value,days){    //封装一个设置cookie的函数
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+days);   //days为保存时间长度
        document.cookie=name+'='+value+';expires='+oDate;
    }

})
