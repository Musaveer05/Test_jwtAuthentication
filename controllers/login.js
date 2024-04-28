const bcrypt = require('bcrypt')
const User_model = require('../models/user')
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.SECRETKEY || 'thisismyjwtsecretTokenshouldbestoredinenv'

module.exports.postLoginForm = async(req,res) =>{

    try{
        
        const {email, password} = req.body

        if(!email || !password) throw new Error('Fields cannot be left blank')

        const user = await User_model.findOne({email})
        if(!user) throw new Error('User not Found, Please Login')

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) throw new Error('Enter Valid Email or Password')

        const token = jwt.sign({_id: user._id, email:user.email}, jwt_secret, {expiresIn: '2m'});

        res.json({token});
    }
    catch(Error){
        res.send(Error.message)
    }

}