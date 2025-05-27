import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage
const todos: any[] = [];
const TEST_USER_ID = 'test-user-123';

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    console.log('Server: Fetching todos');
    res.json(todos);
  } catch (error) {
    console.error('Server: Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Create a new todo
app.post('/api/todos', async (req, res) => {
  try {
    console.log('Server: Creating todo with data:', req.body);
    const newTodo = {
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
      ...req.body,
      userId: TEST_USER_ID,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    todos.push(newTodo);
    res.json(newTodo);
  } catch (error) {
    console.error('Server: Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    console.log('Server: Updating todo:', req.params.id, 'with data:', req.body);
    const index = todos.findIndex(todo => todo.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    const updatedTodo = {
      ...todos[index],
      ...req.body,
      completed: req.body.completed ?? todos[index].completed,
      updatedAt: new Date()
    };
    todos[index] = updatedTodo;
    res.json(updatedTodo);
  } catch (error) {
    console.error('Server: Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    console.log('Server: Deleting todo:', req.params.id);
    const index = todos.findIndex(todo => todo.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.json({ success: true });
  } catch (error) {
    console.error('Server: Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 