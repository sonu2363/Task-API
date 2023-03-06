const TaskModel=require('../models/tasksModel')
const asyncWrapper=require('../middleware/async')
const {createCustomError}=require('../errors/customError')


const getAllTasks=asyncWrapper(async(req,res)=>{
    //try {
        const tasks=await TaskModel.find({})
        res.status(200).json({tasks})
        //Below two res are the  ways in which I can write res other than above line
        //res.status(200).json({tasks,amount:tasks.length})
        //res.status(200).json({status:'success',data:{tasks,nbHits:tasks.length}})
        
   // } catch (error) {
       // res.status(500).json({msg:error})
   // }
    
})

const createTask=asyncWrapper(async(req,res)=>{
   // try{
        const task=await TaskModel.create(req.body)
        res.status(201).json({task})//201 for successful post request
   // }
    //catch(err){
       // res.status(501).json({msg:err})
   // }
  
})
//one req has only one res


//we can work without try catch block also by making our own middleware like asyncWrapper
//so that we don't have to write async await everytime
const getTask=asyncWrapper( async(req,res,next)=>{
try {
    const {id:taskID}=req.params//Here taskID is aliased with id , at the same time "id" is
    // destructured
    const task=await TaskModel.findOne({_id:taskID})
       return res.status(200).json({task})    
} 
catch{//I can put error as argument or not it's my choice
     
    // console.log('error')
     const {id:taskID}=req.params
     return next(createCustomError(`No task with id:${taskID}`,404))
}

    
})

const updateTask=async(req,res)=>{
    try{
            const {id:taskID}=req.params//destructuring and aliasing
            const task=await TaskModel.findOneAndUpdate({_id:taskID},req.body,
              {
                new:true,
                runValidators:true,

              }  //third parameter had to be here becuase I was able to enter empty
              //string 
                
                )
            res.status(200).json({task})
            
    }
    catch(error)
    {
        res.json(error)

    }
    
}//I have used patch instead of put because patch is partial update and put is fully update
//that means only that property will be update that i want in patch but in put if default value
//is false , it will become false in put if i don't give but in patch it will remain true

const deleteTask=async(req,res)=>{
    try {
        const {id:taskID}=req.params
        const task=await TaskModel.findOneAndDelete({_id:taskID})
        return res.status(200).json({m:`deleted`})
        
    } catch (error) {
        res.status(500).json({msg:error})
        
    }
 
}

module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}