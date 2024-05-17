# 3MTT - ALT_SCHOOL Backend Engineering – Intermediate Module Assessment (Blogging API)
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
- Entity Relationship Diagram (ERD)
 
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
> Endpoint: **POST** `https://threemtt-blog-api-1.onrender.com/api/v1/auth/register`
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
  {
  "message": "Registration Successful",
  "user": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "dre@gmail.com",
    "avatar_path": "path_to_file",
    "_id": "6640227ba9dc33erffdfd",
    "__v": 0
  }
  }
```

### User Login
> Endpoint: **POST** `https://threemtt-blog-api-1.onrender.com/api/v1/auth/login`


### Request Body:
```json
 {
  "email": "john.doe@example.com",
  "password": "yourpassword"
 }
```

### Response:
- Success: 200 Ok
  
```json
{
  "message": "Login Successful",
  "user": "Token"
}
```

### Logout User
> Endpoint: **GET** `https://threemtt-blog-api-1.onrender.com/api/v1/auth/logout`

### Response:
- Success: 200 OK
```json
 {
  "message": "Logout Successful"
 }
```
## Blog API
### Create Blog
> Endpoint: **POST** `https://threemtt-blog-api-1.onrender.com/api/v1/blog/add-blog`
### Request Body:
```json
{
 "title": "Dummy Title",
	"description": "This is lorem",
	"author": "6640220a9f13fb5f699a5f33",
 "tags": ["expressjs", "mongodb"],
 "body" : " There are many variations of passages of Lorem Ipsum available."
 "avatar_path": "path_to_file"
}
```
### Response: 
- Success: 201 Created
```json
{
  "message": "Post created successfully",
  "blog": {
    "title": "Dummy Title",
    "description": "This is lorem",
    "author": "6640220a9f13fb5f699a5f33",
    "state": "draft",
    "read_count": 0,
    "reading_time": 2,
    "tags": [
      "expressjs",
      "mongodb"
    ],
    "body": " There are many variations of passages of Lorem Ipsum available.",
    "timestamp": "2024-05-17T03:44:40.84Z",
    "_id": "6646d2a82dd0f18c8185d867",
    "__v": 0
  }
}
```
### Get All Blogs
> Endpoint: **POST** `https://threemtt-blog-api-1.onrender.com/api/v1/blog/blog`

### Response:
- Success: 200 OK
```json
  {
  "blogs": {
    "docs": [
            {
    "title": "Dummy Title",
    "description": "This is lorem",
    "author": "6640220a9f13fb5f699a5f33",
    "state": "draft",
    "read_count": 0,
    "reading_time": 2,
    "tags": [
      "expressjs",
      "mongodb"
    ],
    "body": " There are many variations of passages of Lorem Ipsum available.",
    "timestamp": "2024-05-17T03:44:40.84Z",
    "_id": "6646d2a82dd0f18c8185d867",
    "__v": 0
   }
  ],
    "totalDocs": 1,
    "limit": 20,
    "totalPages": 1,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
  }
}
```
### Get My Blogs
> Endpoint: **GET** `https://threemtt-blog-api-1.onrender.com/api/v1/blog/my-blogs`
- Fetches all blog posts created by the authenticated user.
### Response:
- Success: 200 OK
```json
{
  "blogs": {
    "docs": [
            {
    "title": "Dummy Title",
    "description": "This is lorem",
    "author": {
          "firstname": "Andre",
          "lastname": "Solomon"
     },
    "state": "draft",
    "read_count": 0,
    "reading_time": 2,
    "tags": [
      "expressjs",
      "mongodb"
    ],
    "body": " There are many variations of passages of Lorem Ipsum available.",
    "timestamp": "2024-05-17T03:44:40.84Z",
    "_id": "6646d2a82dd0f18c8185d867",
    "__v": 0
   }
  ],
    "totalDocs": 1,
    "limit": 20,
    "totalPages": 1,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
  }
}
```
### View Single Blog
> Endpoint: **GET** https://threemtt-blog-api-1.onrender.com/api/v1/blog/single-blog/:id
- Fetches a single blog post by its ID.
### Response:
- Success: 200 OK
```json
{
   "message": "Post created successfully",
    "blog": {
      "title": "Dummy Title",
      "description": "This is lorem",
      "author": "6640220a9f13fb5f699a5f33",
      "state": "draft",
      "read_count": 1,
      "reading_time": 2,
      "tags": [
        "expressjs",
        "mongodb"
      ],
      "body": " There are many variations of passages of Lorem Ipsum available.",
      "timestamp": "2024-05-17T03:44:40.84Z",
      "_id": "6646d2a82dd0f18c8185d867",
      "__v": 0
    }
}
```
### Update Blog
> Endpoint: **PUT** `https://threemtt-blog-api-1.onrender.com/api/v1/blog/edit-blog/:id`
- Updates an existing blog post by its ID.
### Request Body:
```json
{
  "title": "This is a new title",
  "state": "published"
}
```
### Response:
- Success: 200 OK
```json
 {
   "message": "Post updated successfully",
    "blog": {
      "title": "This is a new title",
      "description": "This is lorem",
      "author": "6640220a9f13fb5f699a5f33",
      "state": "published",
      "read_count": 1,
      "reading_time": 2,
      "tags": [
        "expressjs",
        "mongodb"
      ],
      "body": " There are many variations of passages of Lorem Ipsum available.",
      "timestamp": "2024-05-17T03:44:40.84Z",
      "_id": "6646d2a82dd0f18c8185d867",
      "__v": 0
    }
}
```
### Delete Blog
> Endpoint: **DELETE** https://threemtt-blog-api-1.onrender.com/api/v1/blog/delete-blog/:id
- Deletes a blog post by its ID.

### Response:
- Success: 200 OK
```json
 {
   "message": "Post deleted successfully",
    "blog": {
      "title": "This is a new title",
      "description": "This is lorem",
      "author": "6640220a9f13fb5f699a5f33",
      "state": "published",
      "read_count": 1,
      "reading_time": 2,
      "tags": [
        "expressjs",
        "mongodb"
      ],
      "body": " There are many variations of passages of Lorem Ipsum available.",
      "timestamp": "2024-05-17T03:44:40.84Z",
      "_id": "6646d2a82dd0f18c8185d867",
      "__v": 0
    }
}
```
### Search Blog
> Endpoint: GET https://threemtt-blog-api-1.onrender.com/api/v1/blog//search-blog?tags=mongodb
- Searches for blog posts by author, title, or tags.

### Response:
- Success: 200 OK
```json
 {
   "result": [
     {
      "title": "This is a new title",
      "description": "This is lorem",
      "author": "6640220a9f13fb5f699a5f33",
      "state": "published",
      "read_count": 1,
      "reading_time": 2,
      "tags": [
	"expressjs",
	"mongodb"
      ],
      "body": " There are many variations of passages of Lorem Ipsum available.",
      "timestamp": "2024-05-17T03:44:40.84Z",
      "_id": "6646d2a82dd0f18c8185d867",
      "__v": 0
    }
]
}
```

## Middlewares
### createUserValidationMW
> Validates the user registration request. Ensures that the required fields (firstname, lastname, email, and password) are provided and valid.

### authenticateUser
> Authenticates the user by verifying the JWT token. Ensures that only authenticated users can access protected routes, such as the add-blog, edit-blog and logout routes.

### authorizePermissions
> Ensures that only users with authorized permissions can perform actions, such as updating or deleting a blog post.

### createValidationBlogMW
> Validates the blog creation request using JOI package, and ensures that the required fields are provided and valid.

### editValidationBlogMW
> Validates the blog update request using JOI package, and makes sure all the  provided fields and valid.

## Entity Relationship Diagram (ERD)
![ERD](https://github.com/kittisolomon/3MTT-Blog-API/assets/40053238/e55e3d41-66b8-47f5-86ad-5304071287fe)





