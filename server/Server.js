const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const todoModel = require("./Todos")

const port = 3000 || process.env.port;

app.use(bodyParser.json());
app.use(cors());



async function postRoute (req,res) {
  const todo = new todoModel({
      id: Math.random().toString(36).substring(2,9),
      title: req.body.title,
      description: req.body.description
  })
  try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
  } catch (error) {
      res.status(400).json({message:"Error creating a Todo"});
  }
}

async function getRoute(req,res) {
  try{
      const todos = await todoModel.find();
      res.json(todos)
  }
  catch(error){
      res.status(500).json({message:"Server Error"});
  }
}


app.get("/todos", getRoute);
app.post("/todos", postRoute);

app.delete("/:id", async(req,res)=>{
  try {
    const deletedTodo = await todoModel.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {return res.status(404).json({ message: "No todo with that ID" })};
    
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})