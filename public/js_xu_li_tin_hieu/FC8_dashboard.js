// function getRndInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) ) + min;
// }
// const easyPieChart_1 = document.getElementById("easyPieChart_1");
// const easyPieChart_1_h5 = document.getElementById("easyPieChart_1_h5");
// setInterval(function() {$('#easyPieChart_1').attr("data-percent","50")}, 1000);


var socket = io.connect()
// phải viết các hàm đọc sự kiện đứng trước {init (hàm lặp vô tận)}
document.getElementById("tram1_refresh").onclick = function() {
    // ban đầu
     fn_Table01_SQL_Show()
};
document.getElementById("tram2_refresh").onclick = function() {
    // ban đầu
     fn_Table01_SQL_Show()
};
document.getElementById("tram3_refresh").onclick = function() {
    // ban đầu
     fn_Table01_SQL_Show()
};
// // Tìm kiếm SQL theo khoảng thời gian
function fn_Table01_SQL_Show(){
    socket.emit("msg_SQL_By_NAME_VALUE", "true");
    socket.on('SQL_By_NAME_VALUE',function(data){
        fn_table_02(data);
        console.log("done_SQL_By_NAME_VALUE")
        // document.getElementById("btt_Refresh").classList.remove("button--loading")
    }); 
}
// hiện với lần đầu load trang
setTimeout('fn_Table01_SQL_Show()', 3333); //thực thi sau 1s
// Hiển thị dữ liệu ra bảng
function fn_table_02(data){
  if(data){
    var len = data.length;
    var XLDay_1 = 0
    var XLQuay_1 = 0
    var XLNangHA_2 = 0
    var KhiDanPhoi_2 = 0
    var XLDay_2 = 0
    var Khoan_3 = 0
    var Dap_3 = 0
    var Kep_3 = 0
    var Gat_3 = 0
    var Ban_Xoay = 0
    if(len > 0){
        for(var i=0;i<len;i++)
        {
          if (data[i]._NAME == 'TCP_IP_tram.tramChu.Tram01_CBXLDay' || data[i]._NAME == 'TCP_IP_tram.tramChu.Tram01_CBXLThu') {
            XLDay_1 = XLDay_1 + data[i]["COUNT(_NAME)"]
          }
          if (data[i]._NAME == 'TCP_IP_tram.tramChu.Tram01_CBHTNhaPhoi' || data[i]._NAME == 'TCP_IP_tram.tramChu.Tram01_CBHTVTHutPhoi') {
            XLQuay_1 = XLQuay_1 + data[i]["COUNT(_NAME)"]
          }
          if (data[i]._NAME == 'TCP_IP_tram.tram2.Tram02_CbXLDuoi' || data[i]._NAME == 'TCP_IP_tram.tram2.Tram02_CbXLtren') {
            XLNangHA_2 = XLNangHA_2 + data[i]["COUNT(_NAME)"]
          }
          if (data[i]._NAME == 'TCP_IP_tram.tram2.Tram02_XLDanPhoi') {
            KhiDanPhoi_2 = KhiDanPhoi_2 + data[i]["COUNT(_NAME)"]
          }          
          if (data[i]._NAME == 'TCP_IP_tram.tram2.Tram02_XLDay') {
            XLDay_2 = XLDay_2 + data[i]["COUNT(_NAME)"]
          } 
          if (data[i]._NAME == 'TCP_IP_tram.tramChu.tram03_KhoanDiXuong') {
            Khoan_3 = Khoan_3 + data[i]["COUNT(_NAME)"]
          }   
          if (data[i]._NAME == 'TCP_IP_tram.tramChu.Tram03_DapPhoi') {
            Dap_3 = Dap_3 + data[i]["COUNT(_NAME)"]
          }         
          if (data[i]._NAME == 'TCP_IP_tram.tramChu.Tram03_KepPhoi') {
            Kep_3 = Kep_3 + data[i]["COUNT(_NAME)"]
          }       
          if (data[i]._NAME == 'TCP_IP_tram.tramChu.Tram03_GatPhoi') {
            Gat_3 = Gat_3 + data[i]["COUNT(_NAME)"]
          }                 
          if (data[i]._NAME == 'TCP_IP_tram.tramChu.Tram03_BanXoay') {
            Ban_Xoay = Ban_Xoay + data[i]["COUNT(_NAME)"]
          }                  
        }
      }
      document.getElementById("XLDay_1").innerHTML = `đã hoạt động ${XLDay_1} lần`
      document.getElementById("XLQuay_1").innerHTML = `đã hoạt động ${XLQuay_1} lần`
      document.getElementById("XLNangHA_2").innerHTML = `đã hoạt động ${XLNangHA_2} lần`
      document.getElementById("KhiDanPhoi_2").innerHTML = `đã hoạt động ${KhiDanPhoi_2} lần`
      document.getElementById("XLDay_2").innerHTML = `đã hoạt động ${XLDay_2} lần`
      document.getElementById("Khoan_3").innerHTML = `đã hoạt động ${Khoan_3} lần`
      document.getElementById("Kep_3").innerHTML = `đã hoạt động ${Kep_3} lần`
      document.getElementById("Gat_3").innerHTML = `đã hoạt động ${Gat_3} lần`
      document.getElementById("Ban_Xoay").innerHTML = `đã hoạt động ${Ban_Xoay} lần`
  }   
}

