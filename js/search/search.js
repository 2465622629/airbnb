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
        test_position: [112.492381,34.680255], //112.492381,34.680255 112.474401,34.644831
        position_list: null

    }, mounted() {
        this.get_card_info()
        this.addBox_list()
    }, methods: {
        get_card_info: function () {
            let that = this
            axios.get("http://rap2api.taobao.org/app/mock/292165/search_res")
                .then(function (resp) {
                    that.card_info = resp.data.house_res_list
                })
        }, move_position: function () {
            this.addPoint(this.test_position)
            map.panTo(this.test_position)
        }, addPoint: function (position) {
            new AMap.InfoWindow({
                content: "hello",
            }).open(map, position)
        },addBox_list:function () {
            let position_list = [[112.474401,34.644831],[112.46557,34.619306]]
            for (let i = 0; i < position_list.length; i++) {
                this.addPoint(position_list[i])
            }
        }
    }
}).$mount('#content_card_img')
