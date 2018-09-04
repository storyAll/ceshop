
//选项卡切换样式
var tabs=$("#tabs_cards li");
tabs.click(function () {
        $(this).addClass("active").siblings().removeClass('active')
        $("#tab_body .cards").eq($(this).index()).show().siblings().hide()
    })

//鼠标经过卡片时的动画
$(".cards1").mouseover(function () {

})
$(".cards2").mouseover(function () {
    $(this).addClass()
})
$(".cards3").mouseover(function () {

})
