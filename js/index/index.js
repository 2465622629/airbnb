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
        house_card: [],//特惠
        good_house: [],//好评
        wonderful_list: [], //精彩之地
        cost_performance_card: [],// 高性价比
        // 精彩之地城市列表
        wonderful_city_list: ['春熙路', '香香巷', '水井坊博物馆', '太古里', '华兴街', '大慈寺', ' 文殊院', '天府广场'],
        input_city: '',


    },
    mounted() {
        this.getHouseCardList("成都")

        this.getCard_good_card("成都")//小卡片
        this.wonderful_place("长沙")
        this.cost_performance("成都")
    },
    methods: {
        //特惠
        getHouseCardList: function (city) {
            let that = this
            axios.get("http://192.168.137.152:2083/Airbnb/showHouse/showHouseinfo", {
                params: {
                    address: city
                }
            })
                .then(function (resp) {
                    that.house_card = resp.data.Hostimg

                    console.log("房源西悉尼")
                    console.log(resp.data.Hostimg)
                    // dom_list = resp.data.Hostimg
                    // console.log(that.house_card)
                }).catch(function (error) {
                console.log(error);
            })
        },
        // 好评
        getCard_good_card: function (city) {
            let that = this
            axios.get("http://192.168.137.152:2083/Airbnb/houstPraise/showHouseinfo", {
                params: {
                    address: city
                }
            })
                .then(function (resp) {
                    that.good_house = resp.data.Hostimg
                    console.log(that.good_house)
                }).catch(function (error) {
                console.log(error);
            })
        },
        // 探索精彩之地
        wonderful_place: function (city) {

            let that = this
            axios.get("http://192.168.137.152:2083/Airbnb/showHouse/showHouseinfo", {
                params: {
                    address: city
                }
            })
                .then(function (resp) {
                    console.log("探索精彩之地")
                    that.wonderful_list = resp.data.Hostimg
                    console.log(that.good_house)
                }).catch(function (error) {
                console.log(error);
            })
        },
        // 高性价比
        cost_performance: function (city) {
            let that = this
            axios.get("http://192.168.137.152:2083/Airbnb/houstPraise/showHouseinfo", {
                params: {
                    address: city
                }
            })
                .then(function (resp) {
                    console.log("高性价比")
                    that.cost_performance_card = resp.data.Hostimg
                    console.log(that.cost_performance_card)
                }).catch(function (error) {
                console.log(error);
            })
        },
        search_city(address, start_date, end_date) {
            console.log(address, start_date, end_date)
            axios.get("http://192.168.137.152:2083/Airbnb/Serach/selectHouseinfo", {
                params: {
                    address: address,
                    startTime: start_date,
                    endTime: end_date
                }
            })
                .then(function (resp) {
                    console.log(resp.data)
                }).catch(function (error) {
                console.log(error);
            })
        },

        targ_value(address, start_date) {
            console.log(`address${address} , start_date${start_date}`)
            location.href = `/airbnb/html/search/search.html?address=${address}&start_date=${start_date}`
        },
        //跳转详情页
        target_details: function (card_id) {
            window.location.href = location.href = `/airbnb/html/details/details.html?house_id=${card_id}`
        },
        // 判断是否登录
        isLogin_user:function () {
            console.log("进入方法")
            let that = this
            console.log("是否登录" + Main.data().isLogin)
            if (!Main.data().isLogin){ //如果用户没有登录 打开登录窗口
                Main.data().dialogTableVisible = true

                Main.methods.open("请登录后操作",'error')
            }
        },
    }
})


var Main = {
    mounted() {
        // this.login_vid('张三','123456')
    },
    data() {
        return {
            input_name: '',
			input_pwd:'',
            search_input:'',
            dialogTableVisible: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            isLogin:false

        };

    }, methods: {
        // 表单验证

        // 非空验证
        is_empty:function (name,pwd){
            let that = this
            console.log(name,pwd)
            let msg  = ''
            let types = 'warning'
            if (name=='' && pwd ==''){
                msg = '请输入完整信息'

                that.open(msg,types)
            }
            // else if (){
            //     msg = '登录成功'
            //     open(msg)
            // }
        },
        //登录请求
        login_vid:function(name,pwd){
            let that = this
            let msg = ''
            let isLogin = false
            axios.get("http://192.168.137.152:2083/Airbnb/register/login", {
                params: {
                    userName:name,
                    userPwd:pwd
                }
            }) .then(function (resp) {
                console.log(resp.data.code)
                let code = resp.data.code
                let types = 'success'
                if (resp.data.code==200){
                    isLogin = true
                    msg = '登录成功'
                    that.isLogin = true
                    that.open(msg,types)
                    that.dialogTableVisible = false
                }
            }).catch(function (error) {
                console.log(error);
            })


        }
        ,
        open(msg,type) {
            this.$message({
                message: msg,
                type: type
            });
        },

        openVn() {
            const h = this.$createElement;
            this.$message({
                message: h('p', null, [
                    h('span', null, '内容可以是 '),
                    h('i', {style: 'color: teal'}, 'VNode')
                ])
            });
        },
        //搜索
        target_value(address) {
            console.log(`address${address}`)
            location.href = `/airbnb/html/search/search.html?address=${address}`
        }
    }
};
var Ctor = Vue.extend(Main)
new Ctor().$mount('#login_app')
