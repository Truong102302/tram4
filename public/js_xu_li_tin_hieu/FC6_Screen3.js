var _3_2B1, _3_2B2, _3_2B3, _3_2B4, _3_2B5, _3_2B6, _3_4M2, _3_3M5, _3_3M4, _3_4M3, _3_5K4, _3_5K3, _3_3M6, _3_3B1 
// Bring up a socket.io connection;
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

    [_3_2B1, _3_2B2, _3_2B3, _3_2B4, _3_2B5, _3_2B6, _3_4M2, _3_3M5, _3_3M4, _3_4M3, _3_5K4, _3_5K3, _3_3M6, _3_3B1 ] = await Promise.all([
        await scanDot(obj,Tram3_2B1, "tram3_2B1"),
        await scanDot(obj,Tram3_2B2, "tram3_2B2"),
        await scanDot(obj,Tram3_2B3, "tram3_2B3"),
        await scanDot(obj,Tram3_2B4, "tram3_2B4"),
        await scanDot(obj,Tram3_2B5, "tram3_2B5"),
        await scanDot(obj,Tram3_2B6, "tram3_2B6"),
        await scanDot(obj,Tram3_4M2, "tram3_4M2"),
        await scanDot(obj,Tram3_3M5, "tram3_3M5"),
        await scanDot(obj,Tram3_3M4, "tram3_3M4"),
        await scanDot(obj,Tram3_4M3, "tram3_4M3"),
        await scanDot(obj,Tram3_5K4, "tram3_5K4"),
        await scanDot(obj,Tram3_5K3, "tram3_5K3"),
        await scanDot(obj,Tram3_3M6, "tram3_3M6"),
        await scanDot(obj,Tram3_3B1, "tram3_3B1")
    ])

})