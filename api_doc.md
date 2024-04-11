# Task Management API Documentation

## Overview

This API provides endpoints for managing tasks and users in a task management application. It allows users to perform CRUD operations on tasks and supports user registration and authentication.

## Base URL

The base URL for accessing the API is `/api`.

## Authentication

Authentication is required for certain endpoints. It is done using JWT (JSON Web Tokens). To authenticate, include the generated token in the `Authorization` header of the request.

## Endpoints

### Tasks

- **GET /api/tasks**
  - Description: Retrieve all tasks.
  - Authentication: Optional
  - Response:
    - 200 OK: Returns an array of tasks.
    - 401 Unauthorized: Authentication token missing or invalid.

- **POST /api/tasks**
  - Description: Create a new task.
  - Authentication: Required
  - Request Body:
    - title: Title of the task (string, required)
    - description: Description of the task (string)
    - due_date: Due date of the task (string, format: YYYY-MM-DD)
  - Response:
    - 201 Created: Returns the created task.
    - 400 Bad Request: Invalid request body.
    - 401 Unauthorized: Authentication token missing or invalid.

- **PUT /api/tasks/:id**
  - Description: Update an existing task.
  - Authentication: Required
  - Request Body:
    - title: Updated title of the task (string)
    - description: Updated description of the task (string)
    - due_date: Updated due date of the task (string, format: YYYY-MM-DD)
  - Response:
    - 200 OK: Returns the updated task.
    - 400 Bad Request: Invalid request body.
    - 401 Unauthorized: Authentication token missing or invalid.
    - 404 Not Found: Task not found.

- **DELETE /api/tasks/:id**
  - Description: Delete an existing task.
  - Authentication: Required
  - Response:
    - 200 OK: Returns a success message.
    - 401 Unauthorized: Authentication token missing or invalid.
    - 404 Not Found: Task not found.

### Users

- **POST /api/users/register**
  - Description: Register a new user.
  - Authentication: Not required
  - Request Body:
    - username: Username of the user (string, required, unique)
    - password: Password of the user (string, required)
  - Response:
    - 201 Created: User registered successfully.
    - 400 Bad Request: Invalid request body or username already exists.

- **POST /api/users/login**
  - Description: Authenticate user and generate JWT token.
  - Authentication: Not required
  - Request Body:
    - username: Username of the user (string, required)
    - password: Password of the user (string, required)
  - Response:
    - 200 OK: Returns the JWT token.
    - 400 Bad Request: Invalid request body or invalid credentials.

