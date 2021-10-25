var clickListener, map = new AMap.Map('container', {
    resizeEnable: true,
    center: [116.39, 39.9]
});


function clickOn(){
    map.on('click', showInfoClick);

}

function showInfoClick(e){
    new AMap.InfoWindow({
        content:`单击了此处 坐标${e.lnglat.getLng()} , ${e.lnglat.getLat()}`,
    }).open(map,e.lnglat)
}

clickOn()
