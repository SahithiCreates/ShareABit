    const mongoose=require("mongoose");

    const foodSchema=mongoose.Schema({
        foodName:{
            type:String,
            required:true 
        },

        quantity:{
            type:String,
            required:true 
        },
        
        location:{
            type:String,
            required:true 
        },

        expiryAt:{
            type:Date,
            required:true 
        },

        status:{
            type:String,
            enum:["available", "claimed", "expired"],
            default:"available"
        },

        donor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true 
        },

        claimedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:null
        },

        description:{
            type:String,
        }
    }, {timestamps : true});

    module.exports=mongoose.model("Food",foodSchema);