import { describe, it } from 'node:test';
import assert from 'node:assert';

const BASE_URL = 'http://localhost:3001';

describe('Tasks API', () => {
  let createdTaskId;

  it('should return healthy status', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.status, 'ok');
  });

  it('should create a task', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test task', description: 'A test', priority: 'high' }),
    });
    assert.strictEqual(res.status, 201);
    const task = await res.json();
    assert.strictEqual(task.title, 'Test task');
    assert.strictEqual(task.status, 'pending');
    assert.strictEqual(task.priority, 'high');
    createdTaskId = task.id;
  });

  it('should reject a task without title', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: 'No title' }),
    });
    assert.strictEqual(res.status, 400);
  });

  it('should reject invalid priority', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Task', priority: 'critical' }),
    });
    assert.strictEqual(res.status, 400);
  });

  it('should list tasks', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert(Array.isArray(body.data));
    assert(body.total >= 1);
  });

  it('should filter tasks by status', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks?status=pending`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    body.data.forEach((task) => assert.strictEqual(task.status, 'pending'));
  });

  it('should get a task by id', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/${createdTaskId}`);
    assert.strictEqual(res.status, 200);
    const task = await res.json();
    assert.strictEqual(task.id, createdTaskId);
  });

  it('should return 404 for unknown task', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/nonexistent-id`);
    assert.strictEqual(res.status, 404);
  });

  it('should update a task', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/${createdTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'in-progress', priority: 'low' }),
    });
    assert.strictEqual(res.status, 200);
    const task = await res.json();
    assert.strictEqual(task.status, 'in-progress');
    assert.strictEqual(task.priority, 'low');
  });

  it('should reject invalid status on update', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/${createdTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'invalid' }),
    });
    assert.strictEqual(res.status, 400);
  });

  it('should delete a task', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/${createdTaskId}`, {
      method: 'DELETE',
    });
    assert.strictEqual(res.status, 204);
  });

  it('should return 404 when deleting non-existent task', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/nonexistent-id`, {
      method: 'DELETE',
    });
    assert.strictEqual(res.status, 404);
  });
});
