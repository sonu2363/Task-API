const express=require('express')
const app=express()
const taskRouter=require('./routes/tasksRout')
const connectDB=require('./db/connect')
require('dotenv').config()
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/errror-handler')


//middleware
app.use(express.static('./public'))
app.use(express.json())


//for data to be used from req.body. It acts as a body-parser
//there is a difference between res.json() and express.json()

//routes
//Task API
app.use('/api/v1/tasks',taskRouter)
//if you forget to put slash before api , it will give you error
app.use(notFound)//this cannot be put above upper route because it will show "route does not exist"
//because positioning matters
app.use(errorHandlerMiddleware)//error handler middleware is written last A/Q to express node docs

const port=3000||process.env.MONGO_URI
//In deploying time , provess.env.MONGO_URI is given 



const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on port ${port}`))
        

    }
    catch(error){
        console.log(error)

    }
}
start()


//A RESTful API is an architectural style for an application program 
//interface (API) that uses "HTTP requests" to access and use data. 
//That data can be used to GET, PUT, POST and DELETE data types, which refers
// to the reading, 
//updating, creating and deleting of operations concerning resources.
//Note: the  main point is if you use http methods then you are making REST API