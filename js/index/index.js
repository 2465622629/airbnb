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
		house_card: [],
		good_house: [],
		// 精彩之地
		wonderful_list: [],
		input_city: ''
	},
	mounted() {
		this.getHouseCardList("郑州")
		this.getCard_good_card("郑州")
		this.wonderful_place()
	},
	methods: {
		search_target: function() {
			window.location.href = '../../html/search/search.html'
		},
		drop: function() {
			alert("hello world")
		},
		//房源卡片列表
		getHouseCardList: function(city) {
			let that = this
			axios.get("http://192.168.137.152:2083/Airbnb/showHouse/showHouseinfo", {
					params: {
						address: city
					}
				})
				.then(function(resp) {
					that.house_card = resp.data.Hostimg
					console.log(that.house_card)
				}).catch(function(error) {
					console.log(error);
				})
		},
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
		wonderful_place: function() {
			let that = this
			console.log("精彩之地" + that.good_house)
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
				.then(function(resp) {
					console.log(resp.data)
				}).catch(function(error) {
					console.log(error);
				})
		},

		targ_value(address, start_date){
			location.href =  `http://localhost:63343/airbnb/html/search/search.html?address=${address}&start_date=${start_date}`
		}
	}
})
