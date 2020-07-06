const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {

    event:{
        type:Schema.Types.ObjectId,
        ref:'Event'
    },
    user :{
        type : Schema.Types.ObjectId,
        ref:'User'
    }
    },
    //Mongoose creates an createdAt and updatedAt fields automatically
    {timestamps:true}
    )

    //1st parameter is "As what you are going to export"
    //2nd is "what are you going to export"
    module.exports = mongoose.model('Booking',bookingSchema);