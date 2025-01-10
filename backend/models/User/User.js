const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        //basic user info
        username: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: Object,
            default: null,
        },
        email: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: false,
        },
         googleId:{
            type: String,
            required: false,     
        },
        authMethod: {
            type:String,
            enum: ["google","local","facebook","github"],
            required: true,
            default: "local",
        },
        passwordResetToken: {
           type: String,
           default: null, 
        },
        accountVerificationToken: {
            type: String,
            default: null,
        },
        accountVerificationExpires: {
            type: Date,
            default: null,
        },
        passwordResetExpires:{
            type: Date,
            default: null,
        },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref:"post"}],
        totalEarnings: {type: Number,default: 0},
        nextEarningDate:{
            type: Date,
            default: ()=>new Date(new Date().getFullYear(), new Date().getMonth()+1,1),
            //first day of the next month
        },
        Plan:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan",
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        payments: [{type: mongoose.Schema.Types.ObjectId,ref:"payment"}],
        hasSelectedPlan: { type: Boolean,default: false},
        lastLogin:{ type: Date,default:Date.now},

        //user relationships
        followers: [{ type: mongoose.Schema.Types.ObjectId,ref:"User"}],
        followings: [{ type: mongoose.mongoose.Schema.Types.ObjectId, ref: "User"}],
    },
    { timestamps: true}
);
module.exports = mongoose.model("User",userSchema);