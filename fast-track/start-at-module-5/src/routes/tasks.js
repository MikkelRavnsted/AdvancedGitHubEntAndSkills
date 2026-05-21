import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// In-memory store
const tasks = [];

// List all tasks
router.get('/', (req, res) => {
  const { status, categoryId, limit = 50, offset = 0 } = req.query;

  let filtered = tasks;
  if (status) {
    filtered = filtered.filter((t) => t.status === status);
  }
  if (categoryId) {
    filtered = filtered.filter((t) => t.categoryId === categoryId);
  }

  const paginated = filtered.slice(Number(offset), Number(offset) + Number(limit));
  res.json({ data: paginated, total: filtered.length });
});

// Get a single task
router.get('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Create a task
router.post('/', (req, res) => {
  const { title, description, categoryId, priority } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: `Priority must be one of: ${validPriorities.join(', ')}` });
  }

  const task = {
    id: uuidv4(),
    title: title.trim(),
    description: description?.trim() || '',
    status: 'pending',
    priority: priority || 'medium',
    categoryId: categoryId || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(task);
  res.status(201).json(task);
});

// Update a task
router.put('/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, status, priority, categoryId } = req.body;
  const validStatuses = ['pending', 'in-progress', 'done'];
  const validPriorities = ['low', 'medium', 'high'];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
  }

  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: `Priority must be one of: ${validPriorities.join(', ')}` });
  }

  const updated = {
    ...tasks[index],
    ...(title && { title: title.trim() }),
    ...(description !== undefined && { description: description.trim() }),
    ...(status && { status }),
    ...(priority && { priority }),
    ...(categoryId !== undefined && { categoryId }),
    updatedAt: new Date().toISOString(),
  };

  tasks[index] = updated;
  res.json(updated);
});

// Delete a task
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

export { router as taskRouter };
