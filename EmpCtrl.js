const employee = require('./EmpModel')



const EmpCtrl = {
    getusers : async (req, res) => {
        try{
            const user = await employee.find()
            res.json({
                status : 'success',
                result : user.length,
                employee : user
            })
            console.log('yuudsfiids')
        }catch(err) {
            return res.status(500).json({msg : err.message})
        }
    },
    createusers : async (req,res) => {
        try{
            const {name, date, phone_number, organization, rating} = req.body
            const user = await employee.findOne({phone_number})
            if(user) {
                return res.status(400).json({msg : "phone number is already registerd"})
            }
            if(phone_number.length != 10){
                return res.status(400).json({msg : "Invalid phone number"})
            }
            const newemployee = new employee({
                name, date, phone_number, organization, rating
            })
            await newemployee.save()
            res.json("newemployee created")
        }catch(err){
            return res.status(500).json({msg : err.message})
        }
    }
}

module.exports = EmpCtrl