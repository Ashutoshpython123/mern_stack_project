const User = require('./UserModel')
const jwt = require('jsonwebtoken');



const UserCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({ msg: "this user is already exist." })
            }
            if (password.length < 6) {
                return res.status(400).json({ msg: "password should be greater than 6 character" })
            }

            const newUser = User({
                name, email, password
            })

            await newUser.save()
            //create jsonwebtoken for authentication
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',

            })

            res.json({ refreshtoken })

            //res.json("register successfully")
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ msg: "this user is not exist." })
            }
            if (password != user.password) {
                return res.status(400).json({ msg: "Incorrect password" })
            }

            //if login suuccess then create access token and refresh token
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',

            })

            res.json({ accesstoken })
            //res.json("login successfully")

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            console.log('logout')
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
            return res.json({ msg: "logged out" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) {
                return res.status(400).json({ msg: "please Login or Register" })
            }
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(400).json({ msg: "please login or register" })
                }
                const accesstoken = createAccessToken({ id: user.id })
                res.json({ user, accesstoken })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) {
                return res.status(400).json({ msg: "user is not exist" })
            }
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
module.exports = UserCtrl




