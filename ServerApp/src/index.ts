import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = parseInt(process.env.PORT || '3001', 10);

app.use(cors());
app.use(express.json());

interface CreateTaskBody {
  title: string;
  priority: 'low' | 'medium' | 'high';
}

interface UpdateTaskBody {
  completed: boolean;
}

// Initialize default user
const initializeDefaultUser = async () => {
  try {
    const defaultUser = await prisma.user.upsert({
      where: { id: 'default-user' },
      update: {},
      create: {
        id: 'default-user',
        email: 'default@zenkai.com',
        name: 'Default User',
        password: 'default-password' // This will be changed when we implement proper auth
      }
    });
    console.log('Default user initialized:', defaultUser.id);
  } catch (error) {
    console.error('Error initializing default user:', error);
  }
};

// Initialize default user on server start
initializeDefaultUser();

// Get all tasks
app.get('/api/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true
      }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a new task
app.post('/api/tasks', async (req: Request<{}, {}, CreateTaskBody>, res: Response) => {
  try {
    const { title, priority } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        completed: false,
        user: {
          connect: {
            id: 'default-user'
          }
        }
      },
      include: {
        user: true
      }
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task
app.patch('/api/tasks/:id', async (req: Request<{ id: string }, {}, UpdateTaskBody>, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const task = await prisma.task.update({
      where: { id: id },
      data: { completed },
      include: {
        user: true
      }
    });
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Zenkai server running on port ${port}`);
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.log(`Port ${port} is in use, trying ${nextPort}`);
      app.listen(nextPort, () => {
        console.log(`Zenkai server running on port ${nextPort}`);
      });
    } else {
      console.error('Error starting server:', error);
    }
  }
};

startServer(); 