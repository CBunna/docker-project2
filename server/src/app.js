const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for all routes
app.use(morgan('combined')); // Request logging
app.use(express.json()); // Parse JSON bodies

// In-memory data store (in production, you'd use a database)
let todos = [
  { 
    id: 1, 
    text: 'Learn Docker', 
    completed: false,
    createdAt: new Date().toISOString()
  },
  { 
    id: 2, 
    text: 'Build React app', 
    completed: true,
    createdAt: new Date().toISOString()
  },
  { 
    id: 3, 
    text: 'Deploy with Docker Compose', 
    completed: false,
    createdAt: new Date().toISOString()
  }
];

// Helper function to get next ID
const getNextId = () => {
  return todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
};

// Routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'todo-backend'
  });
});

// Get all todos
app.get('/api/todos', (req, res) => {
  console.log('GET /api/todos - Returning todos:', todos.length);
  res.json(todos);
});

// Get single todo
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json(todo);
});

// Create new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Todo text is required' });
  }
  
  const newTodo = {
    id: getNextId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  console.log('Created new todo:', newTodo);
  
  res.status(201).json(newTodo);
});

// Update todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const { text, completed } = req.body;
  
  if (text !== undefined) {
    todos[todoIndex].text = text.trim();
  }
  
  if (completed !== undefined) {
    todos[todoIndex].completed = completed;
  }
  
  todos[todoIndex].updatedAt = new Date().toISOString();
  
  console.log('Updated todo:', todos[todoIndex]);
  res.json(todos[todoIndex]);
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  console.log('Deleted todo:', deletedTodo);
  
  res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📝 API available at http://0.0.0.0:${PORT}/api/todos`);
  console.log(`❤️  Health check at http://0.0.0.0:${PORT}/health`);
});