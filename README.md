# A8_taskManager

## 1. Prerequisites

Node.js installed  

MySQL database setup

## 2. Installation
**Clone the repository**
```bash  
git clone https://github.com/YashasviRawat15/A8_taskManager.git
 ```

```bash cd task-management-api```

**Install dependencies**  

```bash npm install```

## 3. Database Setup

Create a MySQL database named task_management.  

Run the SQL script schema.sql located in the db folder to create the required tables (users and tasks).

## 4. Environment Variables

Create a .env file in the root directory and add the following:  

DB_HOST=localhost  

DB_USER=root  

DB_PASSWORD=your_mysql_password  

DB_DATABASE=task_management  

JWT_SECRET=your_secret_key

## 5. Running the API

```bash npm start```

## 6. Testing
``` bash npm install jest supertest --save-dev```

``` bash npm test```

## 7. API Documentation

The API documentation can be found in the api_doc.md file.

