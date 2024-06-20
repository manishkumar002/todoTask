const mongoose = require ("mongoose")
const TodoSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    level:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model('todo_t',TodoSchema)