
$(function () {
//选项卡切换样式
    var tabs = $("#tabs_cards li");
    var statuscode = 0
    var product_list = []
    tabs.click(function () {
        $(this).addClass("active").siblings().removeClass('active')
        $("#tab_body .cards").eq($(this).index()).show().siblings().hide()
    })
    /*tabs切换*/
    $("#tabs li").click(function () {
        $(this).addClass("tabs-active").siblings().removeClass("tabs-active")
    })
//鼠标经过卡片时的动画
    $(".cards1 ul").on("mouseover", "li", function () {
        statuscode=$(".cards1 ul li").index(this)
         renderDetail(statuscode)
        $(this).addClass("hover").siblings().removeClass("hover")
        $(this).siblings().find(".wz").removeClass("wz-hover")
        $(this).find(".wz").addClass("wz-hover").siblings().removeClass("wz-hover")
    })
    request_products()

    function request_products() {
        $.ajax(
            {
                type: 'get',
                url: `http://192.168.0.115:8080/ycweb/product/find_All_product.do`,
                dataType: 'jsonp',
                jsonpCallback: "callback",
                success: function (data) {
                    product_list = data
                    for (let i = 0; i < product_list.length; i++) {
                        $(".cards1 ul").append(`<li style="background: url('${product_list[i].ce_product_icon}')  no-repeat ;">
                            <div class="wz" >
                                <div>${product_list[i].ce_productName}</div>
                                <div>${product_list[i].ce_product_now_price}/年</div>
                            </div>
                        </li>`)
                    }
                    $(".cards1 ul li").eq(0).addClass("hover").siblings().removeClass("hover")
                    renderDetail(statuscode)
                },
                error: function (error) {
                    console.log(error)
                }
            }
        );
    }

    //生成订单号
    function pad2(n) { return n < 10 ? '0' + n : n }
    function pad3(n) {
        if(n<10){
            return  '00'+n
        }else if(n<100){
            return  '0'+n
        }
        return n;
    }
    function generateTimeReqestNumber() {
        var date = new Date();
        return date.getFullYear().toString() +
            pad2(date.getMonth() + 1) +
            pad2(date.getDate()) +
            pad2(date.getHours()) +
            pad2(date.getMinutes())+
            pad2(date.getSeconds()) +
            pad3(date.getMilliseconds())
            ;
    }
    /*立即支付*/
    $("#pay").click(function () {
        if (getCookie("ce_username")==null) {
            alert("请先登录")
        }
        let orderId_time_stamp=generateTimeReqestNumber()
        let order_name=product_list[statuscode].ce_productName
        let buyer=getCookie("ce_username")?getCookie("ce_username"):''
        let order_money=product_list[statuscode].ce_product_now_price
        let order_token=product_list[statuscode].ce_product_token
        console.log(order_token)
        $.ajax(
            {
                type: 'get',
                url: 'http://192.168.0.111:8080/ycweb/order/addOrder.do?ce_order_no='+orderId_time_stamp+'&ce_order_name='+order_name+'&ce_order_buyer='+buyer+'&ce_order_pay_money='+order_money+'&ce_order_pay_time=&ce_order_pay_mode=&ce_order_pay_state=&order_token='+order_token.replace(/\+/g, "+"),
                dataType: 'jsonp',
                jsonpCallback: "callback",
                success: function (data) {

                },
                error: function (error) {
                    console.log(error)
                },
                callback:function () {

                }
            }
        );
    })

    function renderProduct(list) {


    }

    function renderDetail(code) {
        $(".vip-detail .vd").html(`<h4 class="h4">${product_list[code].ce_productName} <span >
        ${product_list[code].ce_product_now_price}/年<i style="font-size: 14px;text-decoration: line-through;
        padding-left: 10px;color: #888 ">原价${product_list[code].ce_product_original_price}/年</i></span></h4>
                    <div class="detail-body">
                        <span>功能：</span><p>${product_list[code].ce_product_desc}</p>
                    </div>`)

        $("#price").text(`${product_list[code].ce_productName}${product_list[code].ce_product_now_price}/年`)
        $("#totalMoney").text(`${product_list[code].ce_product_now_price}/年`)
    }
})

