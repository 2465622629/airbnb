let app = new Vue({
    el:"#app",
    data:{
        pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          value1: '',
          value2: '',
        html_dom:[], //基本网页信息
        head_img:[], //展示图片
        house_img:[] ,//房东头像
        url_pra:0
    },mounted() {
        let that = this
        // 测试用
        this.getUrlPram()
        this.load_html(that.url_pra)
    },

    methods:{
        // 加载页面
        load_html:function (house_id) {
            let that = this
            // 加载基本信息
            axios.get("http://192.168.137.152:2083/Airbnb/showhouseInfo/selectHouseinfo", {
                params: {
                    houseId: house_id
                }
            })
                .then(function(resp) {
                    that.html_dom = resp.data.Hostimg[0]
                }).catch(function(error) {
                console.log(error);
            })
            // 展示图
            axios.get("http://192.168.137.152:2083/Airbnb/showhouseInfo/selectHouseImg", {
                params: {
                    houseId: house_id
                }
            })
                .then(function(resp) {
                    console.log(resp.data)
                    that.head_img = resp.data.Hostimg
                }).catch(function(error) {
                console.log(error);
            })

            //其他信息
            axios.get("http://192.168.137.152:2083/Airbnb/showhouseInfo/selectHoustinfo", {
                params: {
                    houseId: house_id
                }
            })
                .then(function(resp) {
                    console.log(resp.data)
                    console.log("123")
                    // that.head_img = resp.data.Hostimg
                }).catch(function(error) {
                console.log(error);
            })
        },

        //获取url
        getUrlPram:function () {
            let that = this
            let url = window.location.search
            let r = /\d+/
            let res = url.match(r)
            that.url_pra = res[0]
        }
    }
})


var d= "?address=%E6%B4%9B%E9%98%B3&start_date=Wed%20Nov%2017%202021%2000:00:00%20GMT+0800%20(GMT+08:00),Fri%20Nov%2026%202021%2000:00:00%20GMT+0800%20(GMT+08:00)";

var list = d.split("&");
var luoyang = list[0].split("=")[1];
var data = list[1].split("=")[1];




