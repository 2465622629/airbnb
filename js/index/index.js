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
		cost_performance_card:[],// 高性价比
		// 精彩之地城市列表
		wonderful_city_list: ['贵阳', '重庆', '成都', '长沙', '北京', '厦门', '上海', '广州'],
		input_city: '',


	},
	mounted() {
		this.getHouseCardList("成都")

		this.getCard_good_card("成都")//小卡片
		this.wonderful_place("长沙")
		this.cost_performance("贵阳")
	},
	methods: {
		//特惠
		getHouseCardList: function(city) {
			console.log('传入参数名称' + arguments[1])
			let that = this
			axios.get("http://192.168.137.152:2083/Airbnb/showHouse/showHouseinfo", {
					params: {
						address: city
					}
				})
				.then(function(resp) {
					that.house_card = resp.data.Hostimg
					// dom_list = resp.data.Hostimg
					// console.log(that.house_card)
				}).catch(function(error) {
					console.log(error);
				})
		},
		// 好评
		getCard_good_card: function(city) {
			let that = this
			axios.get("http://192.168.137.152:2083/Airbnb/houstPraise/showHouseinfo", {
					params: {
						address: city
					}
				})
				.then(function(resp) {
					that.good_house = resp.data.Hostimg
					console.log(that.good_house)
				}).catch(function(error) {
					console.log(error);
				})
		},
		// 探索精彩之地
		wonderful_place: function(city) {

			let that = this
			axios.get("http://192.168.137.152:2083/Airbnb/showHouse/showHouseinfo", {
				params: {
					address: city
				}
			})
				.then(function(resp) {
					console.log("探索精彩之地")
					that.wonderful_list = resp.data.Hostimg
					console.log(that.good_house)
				}).catch(function(error) {
				console.log(error);
			})
		},
		// 高性价比
		cost_performance:function () {
			let that = this
			axios.get("http://192.168.137.152:2083/Airbnb/houstPraise/showHouseinfo", {
				params: {
					address: city
				}
			})
				.then(function(resp) {
					that.cost_performance_card = resp.data.Hostimg

				}).catch(function(error) {
				console.log(error);
			})
		}
		,
		search_city(address, start_date, end_date) {
			console.log(address, start_date, end_date)
			axios.get("http://192.168.137.152:2083/Airbnb/Serach/selectHouseinfo", {
					params: {
						address: address,
						startTime: start_date,
						endTime: end_date
					}
				})
				.then(function(resp) {
					console.log(resp.data)
				}).catch(function(error) {
					console.log(error);
				})
		},

		targ_value(address, start_date){
			console.log(`address${address} , start_date${start_date}`)
			location.href =  `/airbnb/html/search/search.html?address=${address}&start_date=${start_date}`
		},
		//跳转详情页
		target_details:function (card_id) {
			window.location.href = location.href =  `/airbnb/html/details/details.html?house_id=${card_id}`
		}
	}
})
