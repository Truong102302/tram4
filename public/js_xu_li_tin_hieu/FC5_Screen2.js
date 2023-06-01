var _2_2B1, _2_2B2, _2_2B3, _2_2B4, _2_2B5, _2_2B6, _2_2B7, _2_3PV1, _2_3PV2, _2_3PV3, _2_3PV4, _2_3B1;
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

    [_2_2B1, _2_2B2, _2_2B3, _2_2B4, _2_2B5, _2_2B6, _2_2B7, _2_3PV1, _2_3PV2, _2_3PV3, _2_3PV4, _2_3B1] = await Promise.all([
        await scanDot(obj,Tram2_2B1, "tram2_2B1"),
        await scanDot(obj,Tram2_2B2, "tram2_2B2"),
        await scanDot(obj,Tram2_2B3, "tram2_2B3"),
        await scanDot(obj,Tram2_2B4, "tram2_2B4"),
        await scanDot(obj,Tram2_2B5, "tram2_2B5"),
        await scanDot(obj,Tram2_2B6, "tram2_2B6"),
        await scanDot(obj,Tram2_2B7, "tram2_2B7"),
        await scanDot(obj,Tram2_3PV1, "tram2_3PV1"),
        await scanDot(obj,Tram2_3PV2, "tram2_3PV2"),
        await scanDot(obj,Tram2_3PV3, "tram2_3PV3"),
        await scanDot(obj,Tram2_3PV4, "tram2_3PV4"),
        await scanDot(obj,Tram2_3B1, "tram2_3B1")
    ])
})

