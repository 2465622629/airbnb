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
        test_position: [108.823464, 38.583683],
        position_list: null

    }, mounted() {
        this.get_card_info()
    }, methods: {
        get_card_info: function () {
            let that = this
            axios.get("http://rap2api.taobao.org/app/mock/292165/search_res")
                .then(function (resp) {
                    that.card_info = resp.data.house_res_list
                    console.log(that.card_info)
                })
        }, add_box: function () {
            let that = this
        }, move_position: function () {
            this.addPoint(this.test_position)
            map.panTo(this.test_position)
        }, addPoint: function (position) {
            new AMap.InfoWindow({
                content: "hello",
            }).open(map, position)
        }, getPosition_List: function (cityList) {
            let keywords = cityList[0]
            // 获取搜索信息
            function autoInput() {
                AMap.plugin('AMap.PlaceSearch', function () {
                    var autoOptions = {
                        city: '全国'
                    }
                    var placeSearch = new AMap.PlaceSearch(autoOptions);
                    placeSearch.search(keywords, function (status, result) {
                        alert("查询结果")
                        console.log(result)
                    })
                })
            }
            autoInput()

        }, getCoordinates: function (search_list) {  //获取坐标
            let cityList = []
            for (let item in search_list) {
                cityList.push(item.house_address)
                console.log(item.house_address)
            }
        }
    }
}).$mount('#content_card_img')



// function autoInput(){
//     var keywords = '北京大学';
//     AMap.plugin('AMap.PlaceSearch', function(){
//         var autoOptions = {
//             city: '全国'
//         }
//         var placeSearch = new AMap.PlaceSearch(autoOptions);
//         placeSearch.search(keywords, function(status, result) {
//             // 搜索成功时，result即是对应的匹配数据
//             console.log(result)
//         })
//     })
// }
//
// autoInput();
