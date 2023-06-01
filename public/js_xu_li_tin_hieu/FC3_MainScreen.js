/////////////////////////////////////////////////////////////////////////////////////////////
let btnStart = document.querySelector('#start');
let btnStop = document.querySelector('#stop');
let btnReset = document.querySelector('#reset');
let container_ĐK = document.querySelector(".container_ĐK")
let active_stop = false;
let start ='#1ab773';
let stop ='#d8183e';
let reset ='#e38d0c';
let defaul = "#808080";

// Bring up a socket.io connection
// loadiing màn hình 
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
    console.log(obj);
    // fn_btt_mau_au(find(obj,Manu_Auto));
    // fn_container_Start(find(obj,Start))
    // fn_container_Stop(find(obj,Stop))    
    // fn_container_Reset(find(obj,Reset))   

    // scan_Tram_Start_Reset(obj,Tram1_Start, Tram1_Reset, "tram01")
    // scan_Tram_Start_Reset(obj,Tram2_Start, Tram2_Reset, "tram02")
    // scan_Tram_Start_Reset(obj,Tram3_Start, Tram3_Reset, "tram03")

    await Promise.all([
        await fn_btt_mau_au(find(obj,Manu_Auto)),
        await fn_container_Start(find(obj,Start)),
        await fn_container_Stop(find(obj,Stop)) ,
        await fn_container_Reset(find(obj,Reset)) ,
        await scan_Tram_Start_Reset(obj,Tram1_Start, Tram1_Reset, "tram01"),
        await scan_Tram_Start_Reset(obj,Tram2_Start, Tram2_Reset, "tram02"),
        await scan_Tram_Start_Reset(obj,Tram3_Start, Tram3_Reset, "tram03"),
        await scan_Tram_Start_Reset(obj,Tram4_Start, Tram4_Reset, "tram04"),
    ])
})

// sự kiện click của start
btnStart.addEventListener('click', async () => {
    btnStart.style.backgroundColor = start
    btnStop.style.backgroundColor = defaul
    btnReset.style.backgroundColor = defaul
    // gửi dữ liệu true để tag cmd_Start
    await socket.emit('publish', { 'topic': topicPub, 'payload': payload_start })
    // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"TCP_IP_tram.tram1.btt_Start","v":true},{"id":"TCP_IP_tram.tram1.btt_Stop","v":false},{"id":"TCP_IP_tram.tram1.btt_Reset","v":false}]` })

});

// sự kiện click của stop
btnStop.addEventListener('click', async () => {
    btnStop.style.backgroundColor = stop
    btnStart.style.backgroundColor = defaul
    btnReset.style.backgroundColor = defaul
    active_stop = true;
    // gửi dữ liệu true để tag cmd_stop
    await socket.emit('publish', { 'topic': topicPub, 'payload': payload_stop })
    // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"TCP_IP_tram.tram1.btt_Stop","v":true},{"id":"TCP_IP_tram.tram1.btt_Start","v":false},{"id":"TCP_IP_tram.tram1.btt_Reset","v":false}]` })

})

// sự kiện click của reset
btnReset.addEventListener('click', async () => {
    if(active_stop == true){
        btnReset.style.backgroundColor = reset
        btnStart.style.backgroundColor = defaul
        btnStop.style.backgroundColor = defaul
        active_stop = false
        // gửi dữ liệu true để tag cmd_reset
        await socket.emit('publish', { 'topic': topicPub, 'payload': payload_reset })
        // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"TCP_IP_tram.tram1.btt_Reset","v":true},{"id":"TCP_IP_tram.tram1.btt_Start","v":false},{"id":"TCP_IP_tram.tram1.btt_Stop","v":false}]` })

    }
})

var btn_CĐ = document.getElementById('btn_CĐ')
async function leftClick() {
	btn_CĐ.style.left = '0'
    // giảm độ mờ
    container_ĐK.style.opacity = 0.7;
    // tắt hết nút, màu
    btnStart.disabled = true
    btnStop.disabled = true
    btnReset.disabled = true
    btnStart.style.backgroundColor = defaul
    btnStop.style.backgroundColor = defaul
    btnReset.style.backgroundColor = defaul
    document.getElementById("trangthai").innerHTML = 'Not Running';
    container_ĐK.style.boxShadow = "0 8px 16px 0 gray, 0 6px 20px 0 gray";
    container_ĐK.style.border = "3px solid gray";
    // gửi dữ liệu false để tag cmd_Mode_Manu_Auto

    // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"Channel2.Device1.btt_Manu_Auto","v":false}]` })
    await socket.emit('publish', { 'topic': topicPub, 'payload': payload_Manu })
}

async function rightClick() {
	btn_CĐ.style.left = '110px'
    // tăng độ mờ 
    container_ĐK.style.opacity = 1;
    // bật hết nút
    btnStart.disabled = false
    btnStop.disabled = false
    btnReset.disabled = false

    // gửi dữ liệu true để tag cmd_Mode_Manu_Auto

    // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"Channel2.Device1.btt_Manu_Auto","v":true}]` })
    await socket.emit('publish', { 'topic': topicPub, 'payload': payload_Auto })
}


