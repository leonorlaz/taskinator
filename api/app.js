import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Todo from './models/todoModel.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:5173' }));

const mongoURI = "mongodb+srv://leo:leo123@cluster0.4sdztgx.mongodb.net/todoApp?retryWrites=true&w=majority";

async function connectToDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

connectToDB();

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching todos' });
    }
});


app.post('/todos', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTodo = new Todo({
            title,
            description
        })
        await newTodo.save()
        res.status(201).json(newTodo)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'An error occurred while posting todo' })
    }
})


app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" })
        }

        res.status(200).json({ message: "Todo deleted succesfully", deletedTodo })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'An error occurred while deleting todo' })
    }
})

app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { isCompleted }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating todo' });
    }
});
app.patch('/todos/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(title, description)

    try {
        const editedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true })
        if (!editedTodo) return res.status(404).json({ error: 'An error occured while editing todo' })
        res.status(200).json(editedTodo)
        console.log('editedTodo', editedTodo)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'An error occured while updating todo' })
    }

})
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
