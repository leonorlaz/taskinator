// models/todoModel.js
import mongoose from 'mongoose';



const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    isCompleted: { type: Boolean, default: false }
});

// Create a model for the "todos" collection
const Todo = mongoose.model('Todo', todoSchema, 'todos')

export default Todo;
