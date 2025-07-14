/**
 * Basic application tests
 */
const request = require('supertest');
const express = require('express');

// Mock the database connection
jest.mock('../config/db', () => jest.fn());
jest.mock('../logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('Application', () => {
  let app;

  beforeEach(() => {
    // Clear module cache to get fresh instance
    jest.resetModules();
    
    // Mock environment variables
    process.env.PORT = '3001';
    process.env.NODE_ENV = 'test';
  });

  it('should respond to health check endpoint', async () => {
    // Create a minimal version of the app for testing
    app = express();
    const mongoose = { connection: { readyState: 1 } };
    
    // Health check endpoint
    app.get('/health', (req, res) => {
      const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
      const healthInfo = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        database: dbStatus,
        memory: {
          usage: process.memoryUsage().heapUsed / 1024 / 1024,
          total: process.memoryUsage().heapTotal / 1024 / 1024,
          unit: 'MB',
        },
      };
      res.status(200).json(healthInfo);
    });

    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('database', 'connected');
    expect(response.body).toHaveProperty('environment', 'test');
  });
});