let app = new Vue({
    el: "#template_app",
    data: {
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            shortcuts: [{
                text: '今天',
                onClick(picker) {
                    picker.$emit('pick', new Date());
                }
            }, {
                text: '昨天',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                }
            }, {
                text: '一周前',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                }
            }]
        },
        value1: '',
        value2: '',
        locationList: ['贵阳', '重庆', '成都', '长沙', '北京', '厦门', '上海', '广州'],
        house_card: [
            // {"id": 0, "house_imgUrl": "../../img/01.jpg", "house_info": "别墅", "house_title": "我是标题", "house_price": 123},
            // {"id": 2, "house_imgUrl": "../../img/01.jpg", "house_info": "别墅", "house_title": "我是标题", "house_price": 123}
        ]
    }, mounted() {
        let that = this
        axios.get('http://rap2api.taobao.org/app/mock/292165/houseInfo')
            .then(function (resp) {
                that.house_card = resp.data.house_card_list
            })
    }
})
