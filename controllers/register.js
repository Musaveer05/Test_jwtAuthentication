const User_model = require('../models/user')
const joiSchema = require('../userDefined/user_validation')
const bcrypt = require('bcrypt')


module.exports.postRegisterForm = async(req,res)=>{

    try{
        
        const {email, password} = req.body

        if(!email || !password) throw new Error('Fields cannot be Left blank')

        const Emailexist = await User_model.findOne({email});
        const Joi_check = await joiSchema.validate({email:email, password:password})        

        console.log('email exist', Emailexist)
        console.log('joichec error', Joi_check.error)

        if(Emailexist) throw new Error('User Already Exists')
        if(Joi_check.error) throw new Error('Enter Proper email along with proper format of Password')

        const hash = await bcrypt.hash(password, 12)

        const user = new User_model({
            email,
            password: hash
        })

        await user.save();
        res.send('User Details Saved, You can head to login Page')

    }
    catch(error){
        res.send(error.message)
    }


}