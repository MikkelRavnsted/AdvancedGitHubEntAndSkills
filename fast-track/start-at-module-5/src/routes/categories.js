import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// In-memory store
const categories = [];

// List all categories
router.get('/', (req, res) => {
  res.json({ data: categories, total: categories.length });
});

// Get a single category
router.get('/:id', (req, res) => {
  const category = categories.find((c) => c.id === req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(category);
});

// Create a category
router.post('/', (req, res) => {
  const { name, color } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }

  const existing = categories.find((c) => c.name.toLowerCase() === name.trim().toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'Category with this name already exists' });
  }

  const category = {
    id: uuidv4(),
    name: name.trim(),
    color: color?.trim() || '#6b7280',
    createdAt: new Date().toISOString(),
  };

  categories.push(category);
  res.status(201).json(category);
});

// Update a category
router.put('/:id', (req, res) => {
  const index = categories.findIndex((c) => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const { name, color } = req.body;

  if (name) {
    const existing = categories.find(
      (c) => c.name.toLowerCase() === name.trim().toLowerCase() && c.id !== req.params.id
    );
    if (existing) {
      return res.status(409).json({ error: 'Category with this name already exists' });
    }
  }

  const updated = {
    ...categories[index],
    ...(name && { name: name.trim() }),
    ...(color && { color: color.trim() }),
  };

  categories[index] = updated;
  res.json(updated);
});

// Delete a category
router.delete('/:id', (req, res) => {
  const index = categories.findIndex((c) => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Category not found' });
  }

  categories.splice(index, 1);
  res.status(204).send();
});

export { router as categoryRouter };
