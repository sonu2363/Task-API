const mongoose=require('mongoose')

const TaskSchema=new mongoose.Schema({
    //name:String,
    name:{
          type:String,
          required:[true,'must provide name'],
          trim:true,
          maxLength:[20,'name cannot be more than 20 characters']
    },
    //completed:Boolean
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('Tasks',TaskSchema)
//Here "Tasks" is collections name