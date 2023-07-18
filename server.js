// /////////////////////////THIẾT LẬP KẾT NỐI WEB/////////////////////////
var express = require("express");  //gọi thư viện express
var app = express();				//gọi ứng dụng express
var mqtt = require('mqtt')
/////////////////////////app login
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
/////////////////////////
app.use(express.static("public"));  // pulic thư viện express
app.set("view engine", "ejs");		//gọi file ejs (đã tạo home.ejs) , // để có thể sử dụng cú pháp của ejs ( {name: 'K_zyred'} => <%= name %> )
app.set("views", "./views");		// gọi thư mục view đã tạo

var server = require("http").Server(app);  // gọi liên kết kết nối dạng http
var io = require("socket.io")(server);	// gọi chương trình đọc dữ liệu theo thời gian thực socket.io

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////////////LOGIN/////////////////////////////////////////////
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
///////////////////////
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
const users = []  // biến toàn cục lưu user người dùng
users.push({  // đẩy thông tin vào mảng user đăng nhập
  id: "1",
  name: "admin",
  email: "admin@gmail.com", // lấy được email đã đăng kí từ thẻ cha (register) phải dùng app.use(express.urlencoded({ extended: false }))
  password: "admin"
},
  {  // đẩy thông tin vào mảng user đăng nhập
    id: "2",
    name: "1@1",
    email: "1@1", // lấy được email đã đăng kí từ thẻ cha (register) phải dùng app.use(express.urlencoded({ extended: false }))
    password: "admin"
  },
)
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

/////////////////////////////////////////////////////////////////////////////
app.get('/', checkAuthenticated, (req, res) => {
  res.render('home.ejs', { name: req.user.name })
})
/////////////////////////////////////////////////////////////////////////////
app.get('/tramTQ', checkAuthenticated, (req, res) => {
  res.render('3DtramTQ.ejs', { name: req.user.name })
})
/////////////////////////////////////////////////////////////////////////////
app.get('/dashBoard', checkAuthenticated, (req, res) => {
  res.render('dashBoard.ejs', { name: req.user.name })
})
/////////////////////////////////////////////////////////////////////////////
app.get('/tram1', checkAuthenticated, (req, res) => {
  res.render('tram1.ejs', { name: req.user.name })
})
/////////////////////////////////////////////////////////////////////////////
app.get('/tram2', checkAuthenticated, (req, res) => {
  res.render('tram2.ejs', { name: req.user.name })
})
/////////////////////////////////////////////////////////////////////////////
app.get('/tram3', checkAuthenticated, (req, res) => {
  res.render('tram3.ejs', { name: req.user.name })
})
/////////////////////////////////////////////////////////////////////////////
app.get('/tram4', checkAuthenticated, (req, res) => {
  res.render('tram4.ejs', { name: req.user.name })
})
app.get('/tram5', checkAuthenticated, (req, res) => {
  res.render('tram5.ejs', { name: req.user.name })
})
/////////////////////////////////////////////////////////////////////////////
app.get('/CSDL', checkAuthenticated, (req, res) => {
  res.render('CSDL.ejs', { name: req.user.name })
})

/////////////////////////////////////////////////////////////////////////////
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',  //thỏa mãn về trang / home
  failureRedirect: '/login', // không thỏa mãn thì ở lại trang login
  failureFlash: true
}))
/////////////////////////////////////////////////////////////////////////////
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})
app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 biểu thị độ mạnh của lần quy đổi mảng băm
    users.push({  // đẩy thông tin vào mảng user đăng nhập
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email, // lấy được email đã đăng kí từ thẻ cha (register) phải dùng app.use(express.urlencoded({ extended: false }))
      password: hashedPassword
    })
    res.redirect('/login')  // hàm chuyển hướng đến login
  } catch {
    res.redirect('/register') // chẳng may gặp lỗi chuyển lại trang đăng kí
  }
  console.log(users)
})
/////////////////////////////////////////////////////////////////////////////
app.delete('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});
/////////////////////////////////////////////////////////////////////////////
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

// Port that the web server should listen on
var port = process.env.PORT || 3000;
server.listen(port);  // cổng này phải giống cổng lên home.ejs // var socket = io("http://192.168.0.1:3000")
///////////////////////////////LOGIN/////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////








///////////////////////////////MQTT/////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


// Chúng ta cần xử lý các ký tự đại diện tương ứng như topic, vì vậy không thể chỉ so sánh đơn giản
// Hàm này trả về true nếu chúng khớp nhau và false nếu không
// topic1 có thể bao gồm các ký tự ...và topic2 không thể
var topicMatch = function (topic1, topic2) {
  // Switch our wildcards from MQTT style to Regexp style
  var matchStr = topic1.replace(/#/g, ".*")
  return (topic2.match("^" + matchStr + "$") != null)
}
// tùy chọn kết nối với Broker
var options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  host: process.env.host_MQTT,
  port: 8883,
  protocol: 'mqtts',
  username: process.env.username_MQTT,
  password: process.env.password_MQTT,
  clientId: 'AAA+++++++++++++++++++++++++++'
}
// thiết lập kết nối với Broker
var client = mqtt.connect(options);

// nếu kết nối thành công
client.on('connect', function () {
  console.log('Connected_MQTT');
});

client.on('error', function (error) {
  console.log(error);
});
// kết nối với topic,... trả ra payload
client.on('message', function (topic, payload) {
  // console.log("topic: "+topic)
  // console.log("payload: "+payload)
  // Gửi nó đến bất kỳ socket nào đang theo dõi hoặc quan tâm

  // như vậy là gõ # thì nó nhận tất cả cá topic
  // gõ bất kì thì chỉ nhận từ topic đó thôi
  // lưu ý ấn ctrl+S để reset
  Object.keys(io.sockets.adapter.rooms).map(function (room_name) {
    // Xem phòng (socket room) này có phù hợp với topic đã đề nghị theo dõi ko
    if (topicMatch(room_name, topic)) {
      // Nếu có. Gửi tin nhắn (server)->client
      for (var clientId in io.sockets.adapter.rooms[room_name].sockets) {
        //emit mqtt
        io.sockets.connected[clientId].emit('mqtt', { 'topic': topic, 'payload': payload.toString() })
      }
    }
  })
});
////////////////////////////////////////////////////////////////////////
// thiết lập các bản tin client và server trao đổi khi muốn server public hoặc subscribe
// io.socket bao quất tất cả kết nối của sever, socket đc viết sẵn trong thư viện 
io.sockets.on('connection', function (sock) {// sock: là một đối tượng biểu diễn kết nối giữa broker và server web
  // phương thức on(): thành lập kết nối 
  // New connection, listen for...
  // biến sock của hàm callback lấy dữ liệu từ kết nối với broker trả về
  console.log("New connection from " + sock.id)  //sock.id
  // ...subscribe messages
  sock.on('subscribe', function (msg) {// sock sử dụng phương thức on để nhận yếu cầu từ  client
    // console.log("Message recive",msg) //Message recive { topic: 'iotgateway' }
    console.log("Asked to subscribe to " + msg.topic)
    if (msg.topic !== undefined) {
      sock.join(msg.topic)
      if (io.sockets.adapter.rooms[msg.topic].length == 1) {
        //// Máy đầu là người đầu tiên trong phòng, đăng ký topic MQTT
        client.subscribe(msg.topic)
        console.log("dk")
      }
      //// nếu có máy khác đã ở đây, vì vậy chúng tôi sẽ có đăng ký MQTT rồi
    }
    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////
    // FIXME else It'd be nice to report the error back to the user
    //// FIXME other Sẽ rất tốt nếu báo lỗi lại cho người dùng rằng đã có máy đang dùng rồi
    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////

  })

  // ...publish messages
  sock.on('publish', function (msg) {
    // console.log(msg)
    console.log("socket published [" + msg.topic + "] >>" + msg.payload + "<<")
    client.publish(msg.topic, msg.payload)
  })

  // ...and disconnections
  sock.on('disconnect', function (reason) {
    console.log("disconnect from " + sock.id)
    // socket sẽ rời khỏi tất cả các phòng của nó bây giờ, vì vậy hãy xem liệu có
    // là bất kỳ cái phòng trống nào (hủy kết nối khi cảm thấy phòng chống)
    for (var sub in client._resubscribeTopics) {
      if (io.sockets.adapter.rooms[sub] == undefined) {
        // Không có "phòng" cho đăng ký này, 
        // vì vậy không có khách hàng đang xem nên hủy đăng ký
        console.log("Unsubscribing from " + sub)
        client.unsubscribe(sub)
      }
      // nếu người khác đang xem, vì vậy vẫn subscribe MQTT này 
    }
  })



})

// ///////////////////////////////MQTT/////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////









// // Khai báo SQL
// var mysql = require('mysql');
// var sqlcon

// // var tableName = "PLC_thuc"
// var tableName = process.env.tableName

// function handleDisconnect() {
//   sqlcon = mysql.createConnection({
//     host: process.env.host_SQL,
//     user: process.env.user_SQL,
//     password: process.env.password_SQL,
//     database: process.env.database_SQL,
//     dateStrings: true
//   }) // Recreate the connection, since
//   // the old one cannot be reused.
//   sqlcon.connect(function (err) {              // The server is either down
//     if (err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
//     console.log("Connected DB!");
//   });                                     // process asynchronous requests in the meantime.
//   // If you're also serving http, display a 503 error.
//   sqlcon.on('error', function (err) {
//     console.log('db error', err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//       throw err;                                  // server variable configures this)
//     }
//   });
//   sqlcon.on('end', function () {
//     console.log('end My SQL server connection');
//   });
// }
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
// handleDisconnect();
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////


// // reload dữ liệu
// //io.on : lắng nghe xem có ai kết nối lên k, có người kết nối chạy connection
// io.on("connection", function (socket) {
//   socket.on("reConnect_mySQL", function (data) {
//     sqlcon.end()
//     handleDisconnect();
//     console.log("hi reconnect DB!")
//     socket.emit('reConnect_mySQL_toClient', "true");
//   });
// });

// // Đọc dữ liệu từ SQL
// io.on("connection", function (socket) {
//   socket.on("msg_SQL_Show", function (data) {
//     var sqltable_Name = tableName;
//     var query = "SELECT * FROM " + sqltable_Name + ";"
//     sqlcon.query(query, function (err, results, fields) {
//       if (err) {
//         console.log(err);
//       } else {
//         const objectifyRawPacket = row => ({ ...row });
//         const convertedResponse = results.map(objectifyRawPacket);
//         socket.emit('SQL_Show', convertedResponse);
//       }
//     });
//   });
// });

// // Tìm kiếm dữ liệu SQL theo khoảng thời gian
// io.on("connection", function (socket) {
//   socket.on("msg_SQL_ByTime", function (data) {
//     var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
//     // var tzoffset = (new Date()).getTimezoneOffset() * 0; //offset time Việt Nam (GMT7+)

//     // Lấy thời gian tìm kiếm từ date time piker
//     var timeS = new Date(data[0]); // Thời gian bắt đầu
//     var timeE = new Date(data[1]); // Thời gian kết thúc
//     // Quy đổi thời gian ra định dạng cua MySQL
//     var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
//     var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
//     var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)
//     var sqltable_Name = tableName; // Tên bảng
//     var dt_col_Name = "_TIMESTAMP";  // Tên cột thời gian

//     // gán table cho Query theo dk
//     var Query1 = "SELECT * FROM " + sqltable_Name + " WHERE " + dt_col_Name + " BETWEEN ";
//     var Query = Query1 + timeR + ";";

//     sqlcon.query(Query, function (err, results, fields) {
//       if (err) {
//         console.log(err);
//       } else {
//         const objectifyRawPacket = row => ({ ...row });
//         const convertedResponse = results.map(objectifyRawPacket);
//         socket.emit('SQL_ByTime', convertedResponse);
//       }
//     });
//   });
// });

// // Tìm kiếm dữ liệu SQL theo _NAME và _VALUE
// io.on("connection", function (socket) {
//   socket.on("msg_SQL_By_NAME_VALUE", async function (data) {
//     var sqltable_Name = tableName; // Tên bảng
//     // var tram1 = `'TCP_IP_tram.tramChu.Tram01_CBXLDay','TCP_IP_tram.tramChu.Tram01_CBXLThu','TCP_IP_tram.tramChu.Tram01_CBHTNhaPhoi','TCP_IP_tram.tramChu.Tram01_CBHTVTHutPhoi'`
//     // var tram2 = `'TCP_IP_tram.tram2.Tram02_CbXLDuoi','TCP_IP_tram.tram2.Tram02_CbXLtren','TCP_IP_tram.tram2.Tram02_XLDanPhoi','TCP_IP_tram.tram2.Tram02_XLDay'`
//     // var tram3 = `'TCP_IP_tram.tramChu.tram03_KhoanDiXuong','TCP_IP_tram.tramChu.Tram03_DapPhoi','TCP_IP_tram.tramChu.Tram03_GatPhoi','TCP_IP_tram.tramChu.Tram03_KepPhoi','TCP_IP_tram.tramChu.Tram03_BanXoay'`
//     var tram4 = `'TCP_IP_tram.tramChu.Tram04_CBHTG', 'TCP_IP_tram.tramChu.btt_Manu_Auto','TCP_IP_tram.tramChu.btt_Start'`
//     var _Group_Names = `(${tram1},${tram2},${tram3})`;  // Tên cột thời gian
//     var Query = "Select _NAME,COUNT(_NAME) From " + sqltable_Name + " Where _NAME in " + tram4 + "  Group by _NAME,_VALUE HAVING _VALUE  = 0; ";
//     await sqlcon.query(Query, function (err, results, fields) {
//       if (err) {
//         console.log(err);
//       } else {
//         const objectifyRawPacket = row => ({ ...row });
//         const convertedResponse = results.map(objectifyRawPacket);  
//         socket.emit('SQL_By_NAME_VALUE', convertedResponse);
//       }
//     });
//   });
// });


































































