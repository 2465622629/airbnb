let clickListener, map = new AMap.Map('container', {
    resizeEnable: true,
    center: [116.39, 39.9]
});

let app = new Vue({
    el: "#el_btn",
    data: {
        value: "100",
    }
})


new Vue({
    el: "#content_card_img",
    data: {
        imgList: [
            'https://z1.muscache.cn/im/pictures/miso/Hosting-52016005/original/79ba4f99-7a05-4a24-bbfb-639e6cb2355d.jpeg?aki_policy=large',
            'https://z1.muscache.cn/im/pictures/miso/Hosting-52016005/original/a5a1c787-0ddc-474e-883b-cab3eabc0ef9.jpeg?aki_policy=large',
            'https://z1.muscache.cn/im/pictures/miso/Hosting-52016005/original/27f07a05-0f9b-4b79-bb85-e14288093051.jpeg?aki_policy=large',
            'https://z1.muscache.cn/im/pictures/miso/Hosting-52016005/original/ebe7ce04-61a7-4238-85bb-fa0e63d53ccf.jpeg?aki_policy=large'
        ],
        card_info: null,
        test_position: [112.492381, 34.680255], //112.492381,34.680255 112.474401,34.644831
        position_list: null

    }, mounted() {
        this.get_card_info()
        this.addPoint(this.test_position, "", 156, "cardId")
       let test_marker =  new AMap.Marker({
            map: map,
            position: this.test_position,
            content: "我是点",
            animation: 'AMAP_ANIMATION_DROP'
        });
        this.mark_click(test_marker,this.test_position)
    }, methods: {
        get_card_info: function () {
            let that = this
            axios.get("http://rap2api.taobao.org/app/mock/292165/search_res")
                .then(function (resp) {
                    that.card_info = resp.data.house_res_list
                })
        }, addPoint: function (position, content, price, id) {
            let info = []
            info.push(`<div id=${id} style='background-color: white;padding: 6px 11px; border-radius: 3px;font-weight: 800'>￥${price}</div>`)
            new AMap.Marker({
                map: map,
                position: position,
                content: info.join(""),
                animation: 'AMAP_ANIMATION_DROP'
            });
        }, move_view: function (position) {
            map.panTo(position)
        },
        // 标记点点击事件
        mark_click: function (marker,html_dom) {
            let cont = []
            let html_d = ` <div class="block" id="test_block">
                                    <el-carousel trigger="click"  height="200px">
                                        <el-carousel-item v-for="item in 4" :key="item">
                                            <h3 class="small">
                                               {{item}}
                                            </h3>
                                        </el-carousel-item>
                                    </el-carousel>
                                </div>`
            cont.push(html_d)
            //定义窗体
            var infoWindow = new AMap.InfoWindow({
                isCustom: true,  //使用自定义窗体
                content: cont.join("<br/>"),
                offset: new AMap.Pixel(16, -45)
            });

            AMap.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker.getPosition());
            });
        }
    }
}).$mount('#content_card_img')
