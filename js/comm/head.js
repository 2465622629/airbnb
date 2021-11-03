let targetHome = document.getElementById('index_home');

let like = document.querySelector(".wrapper_nav_item_user_like")

let history = document.querySelector(".wrapper_nav_item_history")

let login = document.querySelector(".wrapper_nav_item_logo")

let user = document.querySelector('.wrapper_nav_item_user_logo')

// 搜索框
let search = document.querySelector('.wrapper_nav_item_search input')
let flag = true
search.addEventListener('focus',function () { // 获取焦点
    showHistoryList(flag)
    flag = false
    this.style.width = '70%'


})

search.addEventListener('blur',function () {
    flag = false
    showHistoryList(flag)
    flag = true
    this.style.width = '60%'
})

targetHome.onclick = function () {
    window.location.href = '../../html/index/index.html'
}


like.onclick = function () {
    window.location.href = '../../html/UserLike/userLike.html'
}


history.onclick = function () {
    window.location.href = '../../html/history/searchHistory.html'
}

login.onclick = function () {
    console.log("123")
}

user.onclick = function () {
    window.location.href = '../../html/'
}
// 公共方法

function test() {
    let url = window.location.href
    if (url.includes("head")){
        console.log(url)
    }else if (url.includes("index")) {
        console.log("我是首页")
    }
}
test()



// 展开搜索提示
function showHistoryList(isShow) {
    let dom = document.querySelector('.search_content')
    if (isShow){
        dom.style.width = '30.95em'
        dom.style.height = 'auto'
    }else {
        dom.style.width = '0em'
        dom.style.height = '0em'
    }
}
