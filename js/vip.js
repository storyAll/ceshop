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
                success: renderProduct,
                error: function (error) {
                    console.log(error)
                }
            }
        );
    }
    /*立即支付*/
    $("#pay").click(function () {
        $.ajax(
            {
                type: 'get',
                url: `http://192.168.0.111:8080/ycweb/order/addOrder.do?ce_order_no=3333&ce_order_name=vip等级3&ce_order_buyer=jacky&ce_order_pay_money=30000&ce_order_pay_time=2018-09-05&ce_order_pay_mode=支付宝&ce_order_pay_state=支付中`,
                dataType: 'jsonp',
                jsonpCallback: "callback",
                success: renderProduct,
                error: function (error) {
                    console.log(error)
                }
            }
        );
    })

    function renderProduct(list) {
        product_list = list
        for (let i = 0; i < list.length; i++) {
            console.log(list[i].ce_productName)
            $(".cards1 ul").append(`<li style="background: url('${list[i].ce_product_icon}')  no-repeat ;">
                            <div class="wz" >
                                <div>${list[i].ce_productName}</div>
                                <div>${list[i].ce_product_now_price}/年</div>
                            </div>
                        </li>`)
        }
        $(".cards1 ul li").eq(0).addClass("hover").siblings().removeClass("hover")
        renderDetail(statuscode)

    }

    function renderDetail(code) {
        $(".vip-detail .vd").html(`<h4 class="h4">${list[code].ce_productName} <span >
        ${list[code].ce_product_now_price}/年<i style="font-size: 14px;text-decoration: line-through;
        padding-left: 10px;color: #888 ">原价${list[code].ce_product_original_price}/年</i></span></h4>
                    <div class="detail-body">
                        <span>功能：</span><p>${list[code].ce_product_desc}</p>
                    </div>`)
    }
})
