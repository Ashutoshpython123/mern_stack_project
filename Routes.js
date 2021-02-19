const router = require('express').Router()
const Usercontroller = require('./UserCtrl')
const Empcontroller = require('./EmpCtrl')
const auth = require('./auth')


//User
router.post('/register', Usercontroller.register)
router.post('/login', Usercontroller.login)
router.get('/logout',Usercontroller.logout)
router.get('/refresh_token', Usercontroller.refreshToken)
router.get('/info',auth, Usercontroller.getUser)


//users
router.route('/employees')
    .get(Empcontroller.getusers)
    .post(Empcontroller.createusers)




module.exports = router