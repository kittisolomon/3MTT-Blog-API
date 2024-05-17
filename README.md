# 3MTT Backend Engineering – Intermediate Module Assessmen (Blogging API)
# Table of Contents
- Introduction
- Setup
- Authentication API
- Register User
- Login User
- Logout User
- Blog API
- Create Blog
- Get All Blogs
- Get My Blogs
- View Single Blog
- Update Blog
- Delete Blog
- Search Blog
- Middleware
 
## Introduction
This project involves creating a robust blogging API that allows users to interact with blogs. The API supports functionalities such as user registration and authentication, creating and managing blog posts, retrieving blog posts with various filters and sorting options.

## Setup
### 1. Clone the Repository
```bash
https://github.com/kittisolomon/3MTT-Blog-API.git
```
### 2. Install depencies
cd navigate-to-project-directory
npm install

### 3. Create a `.env` file in the root directory and add the following environment variables:
```bash
CONNECT_MONGODB_URL=XXXXXXXXXX
JWT_SECRET=XXXXXXXXXX
PORT=8000
```
### 4. Start the application:
```bash
npm start
```
Congratulations! :smile: :rocket: Your application will now be available at: 
```bash
http://localhost:8000
```
## Authentication API
### User Registration
> Endpoint: `https://threemtt-blog-api-1.onrender.com/api/v1/auth/register`
### Request Body:
```json
 {
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "yourpassword",
  "avatar_path": "path_to_file"
 }
```
### Response Body:
- Success: 201 Created
  
  ```json
  "message": "Registration Successful",
  "user": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "dre@gmail.com",
    "avatar_path": "path_to_file",
    "_id": "6640227ba9dc33erffdfd",
    "__v": 0
  }
```
### User Login
> Endpoint: `https://threemtt-blog-api-1.onrender.com/api/v1/auth/login`

### Request Body:

```json
 {
  "email": "john.doe@example.com",
  "password": "yourpassword",
 }
```

### Response Body:
- Success: 200 Ok
  
```json
 {
  "message": "Login Successful",
  "user": "Token"
}
```


