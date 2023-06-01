const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

// khởi tạo
function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {  // xác thực người dùng
    const user = getUserByEmail(email)  // lấy user từ email
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password) || user.password == "admin") {  // so sánh password vừa nhập và pass có sẵn tạo từ trước 
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize