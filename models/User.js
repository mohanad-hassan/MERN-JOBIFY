import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
            //validator.isEmail is comming from external library  just is fnction returns Boolean 
            validator: validator.isEmail,
            message: "Please provide a valid email",
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
        //to not send the password when some one call this id 
        select: false,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "lastName",
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "my city",
    },
});

UserSchema.pre('save',async function() {
    // console.log(this.modifiedPaths())
    // console.log(this.isModified('password'))
   //use function keyword to use this 
   //this refers to the  current user document .
// dont retrigger this hook with doc.save() ot the hashed password will be reshashed again and you wony be able to compare it 
  


if(!this.isModified('password')) return

const salt  = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password,salt)

})


UserSchema.methods.createJwt = function () {
const token  = jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
return token
}
//to compare the password 
UserSchema.methods.comparePassword =async function (canditatePassword) {
const isMatch = await bcrypt.compare(canditatePassword,this.password)
return isMatch
}

export default mongoose.model("User", UserSchema);

