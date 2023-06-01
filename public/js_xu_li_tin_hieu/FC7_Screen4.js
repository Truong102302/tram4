var _4_2B1, _4_2B2,_4_2B3, _4_2B4, _4_2B5, _4_2B6, _4_2B7;
// Bring up a socket.io connection
var socket = io.connect()
socket.on('connect', function () {
    // document.getElementById("hiden-loading").style.display = "none";
})

//đồng ý subcriber topicSub
socket.emit('subscribe', { 'topic': topicSub });

// thông điệp trả ra từ MQTT server
socket.on('mqtt', async function(msg) {
    // document.getElementById("hiden-loading").style.display = "none";
    // chuyển stringJson sang object
    var obj = JSON.parse(msg.payload);

    [_4_2B1, _4_2B2, _4_2B3, _4_2B4, _4_2B5,_4_2B6, _4_2B7] = await Promise.all([
        await scanDot(obj,Tram4_2B1, "4_2B1"),
        await scanDot(obj,Tram4_2B2, "4_2B2"),
        await scanDot(obj,Tram4_2B3, "4_2B3"),
        await scanDot(obj,Tram4_2B4, "4_2B4"),
        await scanDot(obj,Tram4_2B5, "4_2B5"),
        await scanDot(obj,Tram4_2B6, "4_2B6"),
        await scanDot(obj,Tram4_2B7, "4_2B7"),
    ])
})