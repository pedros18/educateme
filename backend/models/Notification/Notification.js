const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"ref",
        },
        postId:{type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
        },
            message: { type:String,required:true,},
            isRead:{tyep: Boolean, default:false},
    },
    {
        timestamps: true,
    }
);
const Notification = mongoose.model("notification", notificationSchema);
module.exports = Notification;