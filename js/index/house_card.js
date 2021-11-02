// 加载卡片信息

let house_card_info = new Vue({
    el:"#house_card_app",
    data () {
        return {
            locationList: ['贵阳', '重庆', '成都', '长沙'],
            house_card: null
        }
    },
    mounted () {
        axios
            .get('http://rap2api.taobao.org/app/mock/292165/houseInfo')
            .then(response => (this.info = response.data))
    }
})
