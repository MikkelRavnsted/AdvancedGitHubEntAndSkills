import { describe, it } from 'node:test';
import assert from 'node:assert';

const BASE_URL = 'http://localhost:3001';

describe('Categories API', () => {
  let createdCategoryId;

  it('should create a category', async () => {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Work', color: '#3b82f6' }),
    });
    assert.strictEqual(res.status, 201);
    const category = await res.json();
    assert.strictEqual(category.name, 'Work');
    assert.strictEqual(category.color, '#3b82f6');
    createdCategoryId = category.id;
  });

  it('should reject category without name', async () => {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: '#ff0000' }),
    });
    assert.strictEqual(res.status, 400);
  });

  it('should reject duplicate category name', async () => {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Work' }),
    });
    assert.strictEqual(res.status, 409);
  });

  it('should list categories', async () => {
    const res = await fetch(`${BASE_URL}/api/categories`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert(Array.isArray(body.data));
    assert(body.total >= 1);
  });

  it('should get a category by id', async () => {
    const res = await fetch(`${BASE_URL}/api/categories/${createdCategoryId}`);
    assert.strictEqual(res.status, 200);
    const category = await res.json();
    assert.strictEqual(category.id, createdCategoryId);
  });

  it('should return 404 for unknown category', async () => {
    const res = await fetch(`${BASE_URL}/api/categories/nonexistent`);
    assert.strictEqual(res.status, 404);
  });

  it('should update a category', async () => {
    const res = await fetch(`${BASE_URL}/api/categories/${createdCategoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Work Projects', color: '#2563eb' }),
    });
    assert.strictEqual(res.status, 200);
    const category = await res.json();
    assert.strictEqual(category.name, 'Work Projects');
  });

  it('should delete a category', async () => {
    const res = await fetch(`${BASE_URL}/api/categories/${createdCategoryId}`, {
      method: 'DELETE',
    });
    assert.strictEqual(res.status, 204);
  });
});
