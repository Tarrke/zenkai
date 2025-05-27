import { useState, useEffect } from 'react';
import { todoService, CreateTodoInput, UpdateTodoInput } from '../services/todoService';
import { Task } from '@prisma/client';

export const useTodos = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    console.log('useTodos: Starting to fetch todos');
    try {
      setLoading(true);
      console.log('useTodos: Calling todoService.getTodos()');
      const data = await todoService.getTodos();
      console.log('useTodos: Received todos from service:', data);
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error('useTodos: Error fetching todos:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (input: CreateTodoInput) => {
    console.log('useTodos: Adding new todo:', input);
    try {
      const newTodo = await todoService.createTodo(input);
      console.log('useTodos: New todo created:', newTodo);
      setTodos(prev => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      console.error('useTodos: Error creating todo:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      setError('Failed to create todo');
      throw err;
    }
  };

  const updateTodo = async (id: string, input: UpdateTodoInput) => {
    console.log('useTodos: Updating todo:', id, input);
    try {
      const updatedTodo = await todoService.updateTodo(id, input);
      console.log('useTodos: Todo updated:', updatedTodo);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      return updatedTodo;
    } catch (err) {
      console.error('useTodos: Error updating todo:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      setError('Failed to update todo');
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    console.log('useTodos: Deleting todo:', id);
    try {
      await todoService.deleteTodo(id);
      console.log('useTodos: Todo deleted successfully');
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('useTodos: Error deleting todo:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      setError('Failed to delete todo');
      throw err;
    }
  };

  useEffect(() => {
    console.log('useTodos: Initial effect running');
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    refreshTodos: fetchTodos,
  };
}; 