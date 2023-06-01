var socket = io.connect()
var aoData = [];
// Yêu cầu dữ liệu bảng
function fn_Table01_SQL_Show(){
    socket.emit("msg_SQL_Show", "true");
    socket.on('SQL_Show',function(data){
        fn_table_01(data);
        $('#table_01').dataTable({ 
                data: aoData,
                destroy: true,
                aoColumns: [
                    { mData: 'id' },
                    { mData: '_NAME' },
                    { mData: '_VALUE' },
                    { mData: '_TIMESTAMP' },
                    { mData: '_QUALITY' }
                ]
        })
        document.getElementById("btt_Refresh").classList.remove("button--loading")
    }); 
}

// kết nối lại với database
function reConnect_mySQL(){
    socket.emit("reConnect_mySQL", "true");
}

// hiện dữ liệu ngay khi mới bắt đầu vào
// fn_Table01_SQL_Show()
socket.on('reConnect_mySQL_toClient',function(){
    const btn = document.getElementById("buttonReload");
    setTimeout('btn.classList.remove("button--loading")', 1000); //thực thi sau 1s
    // btn.classList.remove("button--loading");
}); 
// Hiển thị dữ liệu ra bảng
function fn_table_01(data){
    if(data){
        var len = data.length;
        aoData = []
        if(len > 0){
            for(var i=len-1;i>=0;i--)
            {
                if ((data[i]._QUALITY == 192) || (data[i]._QUALITY =="tốt")) {
                    data[i]._QUALITY = "tốt"
                }
                else {
                    data[i]._QUALITY = "kém"
                }
                aoData.push(data[i]);
            }
        }
    }   
}

// Tìm kiếm SQL theo khoảng thời gian
function fn_SQL_By_Time()
{
    var val = [document.getElementById('dtpk_Search_Start').value,
               document.getElementById('dtpk_Search_End').value];
    if (val[0] != "" && val[1] !=""){
        socket.emit('msg_SQL_ByTime', val);
        socket.on('SQL_ByTime', function(data){
            fn_table_01(data); // Show sdata
            $('#table_01').dataTable({ 
                data: aoData,
                destroy: true,
                aoColumns: [
                    { mData: 'id' },
                    { mData: '_NAME' },
                    { mData: '_VALUE' },
                    { mData: '_TIMESTAMP' },
                    { mData: '_QUALITY' }
                ]
            })
            document.getElementById("btt_Search").classList.remove("button--loading")
        });
    }
}
