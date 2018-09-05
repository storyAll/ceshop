var menuData=[]

var mySwiper = new Swiper ('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    }
})

/*请求菜单内容*/
$.ajax(
    {
        type: 'get',
        url: `http://192.168.0.115:8080/ycweb/first/find_All_Menu.do`,
        dataType: 'jsonp',
        jsonpCallback: "callback",
        success: function (data) {
        menuData=data;
            for(let i in data){
                // console.log(data[i])
                $(".child-menu").append(`<li key="${i}">
                    <div class="title">${data[i].ft_category_name}</div>
                    <div class="bar-content">
                    </div>
                    <div class="menu-line"></div></li>`)
                    for (let j in data[i].second) {
                        $(".bar-content").append(`<span>${data[i].second[j].se_category_name}</span>`)
                    }
                    console.log(data[i].ft_category_name)
                    console.log(data[i].second)
            }
        },
        error: function (error) {
            console.log(error)
        }
    }
);
/*三级菜单展示*/
    var menu_item = $(".child-menu")


$(".child-menu").on("mouseover","li",function () {
    let key=$(this).attr("key")
    let menuList=menuData[key].second
        $(".pad-l").html("")
    if($(".pad-l").children().length<=0){
        for (let i in menuList) {
            $(".pad-l").append(`<div class="pl-item left">
                    <h4 class="p-title">${menuList[i].se_category_name}</h4>
                    <div class="p-link">
                    </div>
                </div>`)
            for (let j in menuList[i].third) {
                $(".p-link").append(`<span><a href="">${menuList[i].third[j].th_category_ame}</a></span>`)
            }
        }
    }
    $(".children-menu").show()
})
console.log($(".child-menu,.children-menu"))
$("#uu").bind("mouseleave",function (e) {
             $(".children-menu").hide()
})
// menu_item.on("mouseout","li",function () {
//     // $(".pad-l").html("")
//     // $(".children-menu").hide()
// })
// $(".children-menu").on("mouseover",function () {
//     $(".children-menu").show()
// })
// $(".children-menu").on("mouseout",function () {
//     $(".children-menu").hide()
// })

/*tabs切换*/
$("#tabs li").click(function () {
    $(this).addClass("tabs-active").siblings().removeClass("tabs-active")
})

