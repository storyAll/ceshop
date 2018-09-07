
$(function () {
    var menuData=[]
    var worksList=[]
    var pattern=['招标模式','众包模式','必中模式']

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
                jsonpCallback: "menuCallback",
                success: function (data) {
                    menuData=data;
                    for(let i in data){
                        // console.log(data[i])
                        $(".nav_left ul").append(`<li data-id="${i+1}"><span>${data[i].ft_category_name}</span></li>`)
                         $(".nav_right").append(` <div class="sub hide" data-id="${i+1}">
                                
                            </div>`)

                        for (let j in data[i].second) {

                            $(".sub").append(`<dl>
                                    <dt><a>${data[i].second[j].se_category_name} <i> &gt;</i></a></dt>
                                    <dd>
                                        
                                    </dd>
                                 </dl>`)
                            console.log(data[i].second[j].third)
                            for(let k in data[i].second[j].third){
                                console.log(data[i].second[j].third[k].th_category_ame)
                               $(".sub dl").eq(j).find("dd").append(`<a>${data[i].second[j].third[k].th_category_ame}</a>`)
                            }

                        }

                    }
                },
                error: function (error) {
                    console.log(error)
                }
            }
        );

     /*菜单交互样式*/
     $('.containor').on('mouseenter', function() {
            $(".nav_right").removeClass('hide');
        }).on('mouseleave', function() {
            $(".nav_right").addClass('hide');
            $(".sub").addClass('hide');
        }).on('mouseenter', 'li', function(e) {
            var li_data = $(this).attr('data-id');
            $(".sub").addClass('hide');
            $('.sub[data-id="' + li_data + '"]').removeClass('hide');
        })




    /*tabs切换*/
    $("#tabs li").click(function () {
        $(this).addClass("tabs-active").siblings().removeClass("tabs-active")
    })
    $(".containor").on('click','span,a',function(){
        $(".containor").hide()
        $("#container .works").show().siblings().hide()
        let keyword=$(this).text()
        $.ajax({
            type: 'get',
            url: `http://192.168.0.115:8080/ycweb/task/find_task.do?task_category=${keyword}`,
            dataType: 'jsonp',
            jsonpCallback: 'worksListCallback',
            success:function(data){
                console.log(data)
                worksList=data;
                for (var i = 0; i < data.length; i++) {
                    let item=data[i]
                    let category=item.task_category.split('-').pop()
                    $("#workList").append(`
                    <div class="w-item">
                        <div class="w-title">
                            <span>${pattern[item.task_pattern]} ￥${item.money_scope}</span>
                            <span>人数上限：${item.limit}人 已投5人</span>
                        </div>
                        <div class="w-user clearfix">
                            <div class="left">${item.task_name}</div>
                            <div class="left">${category}</div>
                            <div class="right">${item.task_view}人浏览</div>
                        </div>
                        <div class="w-date clearfix">
                            <div class="left d-icon" >投稿截止时间: <b>${item.task_time.split('~').pop()}</b></div>
                            <div class="left m-icon">赏金分配: <b>一人 独享赏金</b></div>
                            <div class="right" style="margin-right: 20px">任务编号: <b style="color:#EF0F0F ">${item.number}</b></div>
                        </div>
                    </div>`)
                }
            },
            error:function(error){

            }
        })
    })

})
