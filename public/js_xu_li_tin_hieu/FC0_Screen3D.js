var _3PV1, _3PV2, _3PV3, _3PV4, _3PV5;

var _2_2B1, _2_2B2, _2_3B1, _2_3PV1, _2_3PV2, _2_3PV3, _2_3PV4;

var _3_2B1, _3_2B2, _3_4M2, _3_3M5, _3_3M4, _3_5K4, _3_5K3, _3_3M6;
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

    [_3_2B1, _3_2B2, _3_4M2, _3_3M5, _3_3M4, _3_5K4, _3_5K3, _3_3M6, _3PV1, _3PV2, _3PV3, _3PV4, _3PV5, _2_2B1, _2_2B2, _2_3B1, _2_3PV1, _2_3PV2, _2_3PV3, _2_3PV4 ] = await Promise.all([
        await scanMQTT_3D(obj,Tram3_2B1),
        await scanMQTT_3D(obj,Tram3_2B2),
        await scanMQTT_3D(obj,Tram3_4M2),
        await scanMQTT_3D(obj,Tram3_3M5),
        await scanMQTT_3D(obj,Tram3_3M4),
        await scanMQTT_3D(obj,Tram3_5K4),
        await scanMQTT_3D(obj,Tram3_5K3),
        await scanMQTT_3D(obj,Tram3_3M6),
        await scanMQTT_3D(obj,Tram1_3PV1),
        await scanMQTT_3D(obj,Tram1_3PV2),
        await scanMQTT_3D(obj,Tram1_3PV3),
        await scanMQTT_3D(obj,Tram1_3PV4),
        await scanMQTT_3D(obj,Tram1_3PV5),
        await scanMQTT_3D(obj,Tram2_2B1),
        await scanMQTT_3D(obj,Tram2_2B2),
        await scanMQTT_3D(obj,Tram2_3B1),
        await scanMQTT_3D(obj,Tram2_3PV1),
        await scanMQTT_3D(obj,Tram2_3PV2),
        await scanMQTT_3D(obj,Tram2_3PV3),
        await scanMQTT_3D(obj,Tram2_3PV4),
    ])
    // _3_2B1 = scanMQTT_3D(obj,Tram3_2B1);
    // _3_2B2 = scanMQTT_3D(obj,Tram3_2B2);
    // _3_4M2 = scanMQTT_3D(obj,Tram3_4M2);
    // _3_3M5 = scanMQTT_3D(obj,Tram3_3M5);
    // _3_3M4 = scanMQTT_3D(obj,Tram3_3M4);
    // _3_5K4 = scanMQTT_3D(obj,Tram3_5K4);
    // _3_5K3 = scanMQTT_3D(obj,Tram3_5K3);
    // _3_3M6 = scanMQTT_3D(obj,Tram3_3M6);
    // _3PV1 = scanMQTT_3D(obj,Tram1_3PV1);
    // _3PV2 = scanMQTT_3D(obj,Tram1_3PV2);
    // _3PV3 = scanMQTT_3D(obj,Tram1_3PV3);
    // _3PV4 = scanMQTT_3D(obj,Tram1_3PV4);
    // _3PV5 = scanMQTT_3D(obj,Tram1_3PV5);
    // _2_2B1 = scanMQTT_3D(obj,Tram2_2B1);
    // _2_2B2 = scanMQTT_3D(obj,Tram2_2B2);
    // _2_3B1 = scanMQTT_3D(obj,Tram2_3B1);
    // _2_3PV1 = scanMQTT_3D(obj,Tram2_3PV1);
    // _2_3PV2 = scanMQTT_3D(obj,Tram2_3PV2);
    // _2_3PV3 = scanMQTT_3D(obj,Tram2_3PV3);
    // _2_3PV4 = scanMQTT_3D(obj,Tram2_3PV4)

})