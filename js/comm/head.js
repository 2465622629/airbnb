let targetHome = document.getElementById('index_home');

let like = document.querySelector(".wrapper_nav_item_user_like")

let history = document.querySelector(".wrapper_nav_item_history")

let login = document.querySelector(".wrapper_nav_item_logo")

let user = document.querySelector('.wrapper_nav_item_user_logo')

// 搜索框
let search = document.querySelector('.wrapper_nav_item_search input')

search.addEventListener('focus',function () {
    this.style.width = '70%'
})

search.addEventListener('blur',function () {
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


// login.onclick = function () {
//     window.location.href = '../../html/'
// }
//
// user.onclick = function () {
//     window.location.href = '../../html/'
// }
