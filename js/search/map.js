
var clickListener, map = new AMap.Map('container', {
    resizeEnable: true,
    center: [116.39, 39.9]
});


function clickOn(){
    map.on('click', showInfoClick);
}

function showInfoClick(e){
    let info = []
    info.push("￥1234")

    new AMap.InfoWindow({
        content:info.join(""),
    }).open(map,e.lnglat,map.getCenter())
}

clickOn()
