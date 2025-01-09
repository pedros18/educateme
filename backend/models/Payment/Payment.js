const mongoose = require("mongoose");

//Schema
const paymentSchema = new mongoose.Schema(
    {
        user: {mongoose.Schema.Types.ObjectId,
        ref:"User",
        },
        reference: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        status:{
            type: String,
            default: "pending",
            required: true,
        },
        subscriptionPlan:{
            //use objectid
            type: mongoose.Schema.Types.ObjectId,
            ref:"Plan",
            required: true,
        },
        amount:{
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Payment",paymentSchema);