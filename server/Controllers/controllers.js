const TodoSchema =require('../Models/todoModels')

const createTodo= async(req,res)=>{
    try{
        let{title,description,status,level}=req.body

        let data=new TodoSchema ({title,description,status,level})
        await data.save();
        res.status(200).json({
            code:200,
            massage:"Content added successfully",
           error:false,
           status:true
        })
    }catch(err){
        console.log(err)
    }
}

const getTodo = async(req,res)=>{
   let data = await TodoSchema.find()
   res.send(data);
}


const deleteTodo = async(req,res)=>{
    try{
    let data = await TodoSchema.deleteOne({_id:req.params._id});
    res.send(data)
    }
    catch(err){
        console.log(err)
    }
 }
 

 const putTodo= async(req,res)=>{
    try{
        let{title,description,status,level}=req.body
       
        let data = await TodoSchema.updateOne({_id:req.params._id},{$set:{title,description,status,level}})
       res.send(data);

    }catch(err){
        console.log(err)
    }
}

const searchItem =  async (req,res)=>{
    let data = await TodoSchema.find({
        "$or":[
            {title:{$regex:req.params.key}},
            {description:{$regex:req.params.key}},
        ]
    })
    res.send(data);   
}


module.exports={
    createTodo,
    getTodo,
    deleteTodo, 
    putTodo,
    searchItem
}