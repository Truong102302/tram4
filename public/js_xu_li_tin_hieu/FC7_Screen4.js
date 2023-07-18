var _4_2B1, _4_2B2,_4_2B3, _4_2B4, _4_2B5, _4_2B6, _4_2B7;
// Bring up a socket.io connection
var socket = io.connect()
socket.on('connect', function () { // on nhận kết nối từ MQTT sever
    // document.getElementById("hiden-loading").style.display = "none";
})

//đồng ý subcriber topicSub
socket.emit('subscribe', { 'topic': topicSub });

// thông điệp trả ra từ MQTT server
socket.on('mqtt', async function(msg) { //nhận dữ liệu từ MQTT server
    // document.getElementById("hiden-loading").style.display = "none";
    // chuyển stringJson sang object
    console.log(msg)
    var obj = JSON.parse(msg.payload);

    [_4_2B1, _4_2B2, _4_2B3, _4_2B4, _4_2B5,_4_2B6, _4_2B7, _4_3PV1, _4_3PV2, _4_3PV3, _4_3PV4, _4_H1, _4_H2, _4_Number ] = await Promise.all([
        await scanDot(obj,Tram4_2B1, "4_2B1"),
        await scanDot(obj,Tram4_2B2, "4_2B2"),
        await scanDot(obj,Tram4_2B3, "4_2B3"),
        await scanDot(obj,Tram4_2B4, "4_2B4"),
        await scanDot(obj,Tram4_2B5, "4_2B5"),
        await scanDot(obj,Tram4_2B6, "4_2B6"),
        await scanDot(obj,Tram4_2B7, "4_2B7"),
        await scanDot(obj,Tram4_3PV1, "4_3PV1"),
        await scanDot(obj,Tram4_3PV2, "4_3PV2"),
        await scanDot(obj,Tram4_3PV3, "4_3PV3"),
        await scanDot(obj,Tram4_3PV4, "4_3PV4"),
        await scanDot(obj,Tram4_H1, "4_H1"),
        await scanDot(obj,Tram4_H2, "4_H2"),
        await Number_phoi(obj,Tram4_Number, "Number_phoi")
    ])
})