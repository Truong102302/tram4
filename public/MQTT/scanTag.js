// tìm kiếm ID trả về value tương ứng
function find(payload_parse,id) {
    var myInfo = payload_parse.values.find(function (user) {
        return user.id === id;
    });
    return myInfo.v;
}
// kiểm tra subscribe, topic tương ứng true thì ..., fale thì ...
function fn_btt_mau_au(data){
    if(data == true){
        document.getElementById("Mau_Auto").innerHTML = 'Chế độ hoạt động: Auto';
        btn_CĐ.style.left = '110px'
        // tăng độ mờ 
        container_ĐK.style.opacity = 1;
        // bật hết nút
        btnStart.disabled = false
        btnStop.disabled = false
        btnReset.disabled = false
    } else{
        document.getElementById("Mau_Auto").innerHTML = 'Chế độ hoạt động: Maunual';
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
    }
}
// kiểm tra start
function fn_container_Start(data){
    if(data == true){
        document.querySelector(".container_ĐK").style.boxShadow = "0 8px 16px 0 #1ab773, 0 6px 20px 0 #1ab773";
        document.querySelector(".container_ĐK").style.border = "3px solid #1ab773";
        btnStart.style.backgroundColor = start
        btnStop.style.backgroundColor = defaul
        btnReset.style.backgroundColor = defaul
        document.getElementById("trangthai").innerHTML = 'Running';

        // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"Channel2.Device1.btt_Start","v":false}]` })
        // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"TCP_IP_tram.tram1.btt_Start","v":false}]` })
        socket.emit('publish', { 'topic': topicPub, 'payload': payload_start_false })


    }
}
// kiểm tra stop
function fn_container_Stop(data){
    if(data == true){
        document.querySelector(".container_ĐK").style.boxShadow = "0 8px 16px 0 #d8183e, 0 6px 20px 0 #d8183e";
        document.querySelector(".container_ĐK").style.border = "3px solid #d8183e";
        document.getElementById("trangthai").innerHTML = 'STOP';
        btnStop.style.backgroundColor = stop
        btnStart.style.backgroundColor = defaul
        btnReset.style.backgroundColor = defaul

        // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"Channel2.Device1.btt_Stop","v":false}]` })
        // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"TCP_IP_tram.tram1.btt_Stop","v":false}]` })
        socket.emit('publish', { 'topic': topicPub, 'payload': payload_stop_false })

    }
}
// kiểm tra reset
function fn_container_Reset(data){
    if(data == true){
        document.querySelector(".container_ĐK").style.boxShadow = "0 8px 16px 0 #e38d0c, 0 6px 20px 0 #e38d0c";
        document.querySelector(".container_ĐK").style.border = "3px solid #e38d0c";
        document.getElementById("trangthai").innerHTML = '...';
        btnReset.style.backgroundColor = reset
        btnStart.style.backgroundColor = defaul
        btnStop.style.backgroundColor = defaul

        // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"Channel2.Device1.btt_Reset","v":false}]` })
        // socket.emit('publish', { 'topic': topicPub, 'payload': `[{"id":"TCP_IP_tram.tram1.btt_Reset","v":false}]` })      
        socket.emit('publish', { 'topic': topicPub, 'payload': payload_reset_false })

    }
}
// kiểm tra trạng thái các trạm_start_reset
function scan_Tram_Start_Reset(payload_parse, id1, id2 , idStyleTag){
    // tìm kiểm id trong chuỗi Json
    var myInfo1 = payload_parse.values.find(function (user) {
        return user.id === id1;
    });
    var myInfo2 = payload_parse.values.find(function (user) {
        return user.id === id2;
    });
    
    if(myInfo1.v == true){
        document.getElementById(idStyleTag).style.borderLeft = '12px solid #1ab773'; //xanh
    }
    else if(myInfo2.v == true){
        document.getElementById(idStyleTag).style.borderLeft = '12px solid #e38d0c'; //vàng
    }
    else{
        document.getElementById(idStyleTag).style.borderLeft = '12px solid #d8183e'; //đỏ
    }
}
////////////////////////////////////////////////
function scanDot(payload_parse, id, idStyleTag) {
    // tìm kiểm id trong chuỗi Json
    var myInfo = payload_parse.values.find(function (user) {
        return user.id === id;
    });
    if(myInfo.v == true){
        document.getElementById(idStyleTag).style.backgroundColor = '#1ab773'; //xanh
        return true
    }else{
        document.getElementById(idStyleTag).style.backgroundColor = '#d8183e'; //đỏ
        return false
    }
}
////////////////////////////////////////////////
function scanMQTT_3D(payload_parse, id) {
    // tìm kiểm id trong chuỗi Json
    var myInfo = payload_parse.values.find(function (user) {
        return user.id === id;
    });
    if(myInfo.v == true){
        return true;
    }else{
        return false;
    }
}