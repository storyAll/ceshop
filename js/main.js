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


/*三级菜单展示*/
    var menu_item = $(".child-menu li")

    menu_item.mouseout(function () {
        $(".children-menu").mouseout(function () {
            $(".children-menu").hide()
        })

    })

menu_item.bind("mouseover",function () {
    $(".children-menu").show()
})
menu_item.bind("mouseout",function () {
    $(".children-menu").hide()
})
$(".children-menu").bind("mouseover",function () {
    $(".children-menu").show()
})
$(".children-menu").bind("mouseout",function () {
    $(".children-menu").hide()
})


