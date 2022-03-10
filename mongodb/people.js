var mongoose=require('mongoose')

var people=mongoose.model('people',new mongoose.Schema(
    {
        id:Number,
        name:String,
        location:String,
        country:String
    }
), 'people')

module.exports=people