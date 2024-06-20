const express = require("express")
const Router = express.Router()
const {createTodo,getTodo,deleteTodo,putTodo,searchItem}=require('../Controllers/controllers')

Router.route('/addTodo').post(createTodo);
Router.route('/getTodo').get(getTodo);
Router.route('/getTodo/:_id').delete(deleteTodo);
Router.route('/getTodo/:_id').put(putTodo);
Router.route('/getTodo/:key').get(searchItem);
module.exports=Router;