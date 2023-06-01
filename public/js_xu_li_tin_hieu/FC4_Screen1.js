var _2B1, _2B2, _2B3, _2B4, _2B5, _2B6, _2B7, _2B8, _3PV1, _3PV2, _3PV3, _3PV4, _3PV5;
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

    [_2B1, _2B2, _2B3, _2B4, _2B5, _2B6, _2B7, _2B8, _3PV1, _3PV2, _3PV3, _3PV4, _3PV5] = await Promise.all([
        await scanDot(obj,Tram1_2B1, "_2B1"),
        await scanDot(obj,Tram1_2B2, "_2B2"),
        await scanDot(obj,Tram1_2B3, "_2B3"),
        await scanDot(obj,Tram1_2B4, "_2B4"),
        await scanDot(obj,Tram1_2B5, "_2B5"),
        await scanDot(obj,Tram1_2B6, "_2B6"),
        await scanDot(obj,Tram1_2B7, "_2B7"),
        await scanDot(obj,Tram1_2B8, "_2B8"),
        await scanDot(obj,Tram1_3PV1, "_3PV1"),
        await scanDot(obj,Tram1_3PV2, "_3PV2"),
        await scanDot(obj,Tram1_3PV3, "_3PV3"),
        await scanDot(obj,Tram1_3PV4, "_3PV4"),
        await scanDot(obj,Tram1_3PV5, "_3PV5"),
    ])
})