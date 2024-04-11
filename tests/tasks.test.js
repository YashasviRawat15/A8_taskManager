const request = require('supertest');
const app = require('../app');

describe('Authentication API', () => {
  it('should register a new user', async () => {
    const res = await app
      .post('/register')
      .send({ username: 'testuser', password: 'testpassword' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 for login with invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'invaliduser', password: 'invalidpassword' });
    
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });
});

describe('Tasks API', () => {
  let token; // Store JWT token for authenticated requests

  beforeAll(async () => {
    // Login to obtain JWT token for authenticated requests
    const loginRes = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });
    
    token = loginRes.body.token;
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'This is a test task', user_id: 1 });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Task created successfully');
  });

  it('should get all tasks', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a single task', async () => {
    const taskId = 1; // Assuming task_id 1 exists in the database
    const res = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', taskId);
  });

  it('should update an existing task', async () => {
    const taskId = 1; // Assuming task_id 1 exists in the database
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Task', description: 'This task has been updated' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task updated successfully');
  });

  it('should delete an existing task', async () => {
    const taskId = 1; // Assuming task_id 1 exists in the database
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task deleted successfully');
  });

  it('should return 404 for invalid task ID', async () => {
    const invalidTaskId = 999999; // Assuming this ID does not exist in the database
    const res = await request(app)
      .get(`/tasks/${invalidTaskId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Task not found');
  });
});
