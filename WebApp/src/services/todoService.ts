const API_URL = 'http://localhost:3001/api';

export interface CreateTodoInput {
  title: string;
  priority: 'low' | 'medium' | 'high';
}

export interface UpdateTodoInput {
  completed: boolean;
}

export const todoService = {
  // Create a new todo
  async createTodo(input: CreateTodoInput) {
    console.log('todoService: Creating new todo with input:', input);
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
      
      const newTodo = await response.json();
      console.log('todoService: Created new todo:', newTodo);
      return newTodo;
    } catch (error) {
      console.error('todoService: Error creating todo:', error);
      throw error;
    }
  },

  // Get all todos
  async getTodos() {
    console.log('todoService: Fetching todos');
    try {
      const response = await fetch(`${API_URL}/tasks`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      const todos = await response.json();
      console.log('todoService: Found todos:', todos);
      return todos;
    } catch (error) {
      console.error('todoService: Error fetching todos:', error);
      throw error;
    }
  },

  // Update a todo
  async updateTodo(id: string, input: UpdateTodoInput) {
    console.log('todoService: Updating todo:', id, 'with input:', input);
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      const updatedTodo = await response.json();
      console.log('todoService: Updated todo:', updatedTodo);
      return updatedTodo;
    } catch (error) {
      console.error('todoService: Error updating todo:', error);
      throw error;
    }
  },

  // Delete a todo
  async deleteTodo(id: string) {
    console.log('todoService: Deleting todo:', id);
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      console.log('todoService: Deleted todo successfully');
    } catch (error) {
      console.error('todoService: Error deleting todo:', error);
      throw error;
    }
  },

  // Get a single todo
  async getTodo(id: string) {
    console.log('todoService: Fetching single todo:', id);
    try {
      const response = await fetch(`${API_URL}/todos/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch single todo');
      }
      
      const todo = await response.json();
      console.log('todoService: Found todo:', todo);
      return todo;
    } catch (error) {
      console.error('todoService: Error fetching single todo:', error);
      throw error;
    }
  },
}; 