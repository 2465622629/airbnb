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


let app2 = new Vue({
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
        position_list: [],
        houst_img: null, //房源图片
        card_length: 0,
        //房东头像
        house_img: null,
        // 轮播图列表
        img_list: [],
        //房东列表
        house_list: []
    }, mounted() {
        var that = this
        console.log(window.location.search)

        // 加载时调用
        this.getImgUrlList(2)
        // 测试用
        this.getUrlPrams()
        // 批量添加轮播图

        // 获取坐标
        this.getPosition_add("成都", "四川")
        this.search_city("四川", "2021-10-1", "2021-10-12")
        // this.getImgUrlList()
        this.getHouse_img(1)

    },
    methods: {
        // 搜索城市
        search_city(address, start_date, end_date) {
            let that = this
            axios.get("http://192.168.137.152:2083/Airbnb/Serach/selectHouseinfo", {
                params: {
                    houseAddress: address,
                    startTime: start_date,
                    endTime: end_date
                }
            })
                .then(function (resp) {
                    let tem_imgs = []
                    // console.log("搜索城市")
                    console.log(resp.data)
                    that.card_info = resp.data.houseInfolist
                    that.card_length = resp.data.houseInfolist.length

                    // console.log("尝试添加字段")
                    // for (let i = 0; i < that.card_length; i++) {
                    //     //获取图片数组
                    //     that.getHouse_img(resp.data.houseInfolist[i].house_id)
                    //     tem_imgs = that.house_img
                    //     console.log("当前组")
                    //     console.log(tem_imgs)
                    //     resp.data.houseInfolist[i].house_imgList = tem_imgs
                    //     console.log('添加完成后');
                    //     console.log(resp.data.houseInfolist[i].house_imgList)
                    // }
                    // resp.data.houseInfolist.house_imgList = 'hello'
                    // console.log(resp.data.houseInfolist.house_imgList)


                    that.move_view([104.011607, 30.655745])
                }).catch(function (error) {
                console.log(error);
            })
        },
        //获取房源图片列表
        getImgUrlList: function (house_id) {
            let that = this
            axios.get("http://192.168.137.152:2083/Airbnb/Serach/selectHouseimg", {
                params: {
                    "houseId": house_id
                }
            })
                .then(function (resp) {
                    that.houst_img = resp.data.houseInfolist
                    return that.houst_img
                }).catch(function (error) {
                console.log(error);
            })
        },

        //获取房东头像
        getHouse_img(houst_id) {
            let that = this
            let imgUrl = null

            axios.get("http://192.168.137.152:2083/Airbnb/Serach/selectHostimg", {
                params: {
                    "houseId": houst_id
                }
            })
                .then(function (resp) {
                    console.log("房东头像")
                    console.log(resp.data.Hostimg)
                    that.house_img = resp.data.Hostimg
                }).catch(function (error) {
                console.log(error);
            })
        },

        //获取url参数
        getUrlPrams: function () {
            let that = this
            // 匹配等号到&前所有字符串
            var url = window.location.search

            var list = url.split("&");
            var address = list[0].split("=")[1];
            var date = list[1].split("=")[1];
            console.log(url, address, date)

            //调用搜索 展示列表
            that.search_city(address, date)

        },
        //跳转详情页
        target_details: function (card_id) {
            window.location.href = location.href = `/airbnb/html/details/details.html?house_id=${card_id}`
        },

        // 地图方法
        //获取坐标
        getPosition_add: function (address, city) {
            let that = this
            let position = []
            axios.get("https://restapi.amap.com/v3/place/text", {
                params: {
                    key: "9f7b59f6e61e519ae492ca4b030d6f2f",
                    keywords: address,
                    city: city,
                    types: 120302
                }
            })
                .then(function (resp) {
                    let list = resp.data.pois
                    for (let i = 0; i < list.length; i++) {
                        position.push(list[i].location)
                    }
                    that.position_list = position
                    console.log("全部点添加·--------------------------")
                    that.addpoints(that.position_list, 289, 1)

                    return position
                    // 添加全局变量
                    // console.log( this.position_list)

                }).catch(function (error) {
                console.log(error);
            })
        },
        // 标记点点击事件
        mark_click: function (marker, html_dom) {
            let cont = []
            let html_d = ` 
			<div id='test_block'>
				<el-button type="primary">主要按钮</el-button>
			</div>
			`
            cont.push(html_d)
            //定义窗体
            // var infoWindow = new AMap.InfoWindow({
            //     isCustom: true,  //使用自定义窗体
            //     content: cont.join("<br/>"),
            //     offset: new AMap.Pixel(16, -45)
            // });

            // 高级信息窗体
            var infoWindow = new AMap.AdvancedInfoWindow({
                autoMove: true,  //使用自定义窗体
                closeWhenClickMap: true,
                content: cont.join("<br/>"),
                offset: new AMap.Pixel(16, -45)
            });

            AMap.event.addListener(marker, 'click', function () {
                new Vue().$mount('#test_block')
                console.log("绑定")
                infoWindow.open(map, marker.getPosition());
            });
        },
        //添加点
        addPoint: function (position, price, id) {
            console.log(position.toString())
            let temp = position.toString().split(",")
            console.log(temp)
            let info = []
            info.push(`<div id=${id} style='background-color: white;padding: 6px 11px; border-radius: 3px;font-weight: 800'>￥${price}</div>`)
            let marker = new AMap.Marker({
                map: map,
                position: temp,
                content: info.join(""),
                animation: 'AMAP_ANIMATION_DROP'
            });
            return marker
        },
        //移动视图
        move_view: function (position) {
            map.panTo(position)
        },
        // 批量添加点
        addpoints: function (positionList, price, id) {
            console.log("循环前")
            console.log(positionList)
            let posi = []
            for (var i = 0; i < positionList.length; i++) {
                console.log("当前点是``````````````")
                console.log(positionList[i])
                let marker = this.addPoint(positionList[i], price, id)
                // // 点添加点击事件
                this.mark_click(marker)
            }
        },

    }
})

