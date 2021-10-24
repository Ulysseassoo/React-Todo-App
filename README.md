# React Todo App

This project is a todo app made in React. On the main page we can authenticate, and then add todos to the our list. The main goal of this project was to discover and use Redux. Also to discover how to do private routes on React. I'm also using and discovering the Json Web Token authentification with the use of Node and Mysql for the database.

## Features

- The user can register himself with an email and a password.
- The user can connect and have an account.
- The user can see the different todos he has.
- The user can add a todo.
- The user can supress a todo.
- The user can modify a todo.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Ulysseassoo/React-Todo-App.git
```

Go to the project directory

```bash
  cd client
  cd server
```

Don't forget to add your logs for the database (password, username)

Install dependencies

```bash
  yarn/npm install
```

Start the server

```bash
  yarn dev / npm start dev
```

## Screenshots

Login Page ![App Screenshot](https://user-images.githubusercontent.com/73486687/138609072-e8091f44-eba0-4278-9e61-8cacd9c249b6.png)

Register Page ![App Screenshot](https://user-images.githubusercontent.com/73486687/138609074-bbffd832-ab9b-4f54-94c5-8ab225f73864.png)

Home Page ![App Screenshot](https://user-images.githubusercontent.com/73486687/138609078-a197fe85-3d8f-464a-ae8a-4dd578afad63.png)

## API Reference

## Authentification Route

#### Register User

```http
  POST /api/auth/register
```

#### Login User

```http
  POST /api/user/login
```

#### Get Access to User Infos

```http
  GET /api/auth/privatedata
```

## User Todo Route

#### Get all User Todos

```http
  GET /api/user/todos
```

#### Create a new todo

```http
  POST /api/user/todos
```

#### Delete a todo

```http
  DELETE /api/user/todos/:id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

#### Modify a todo

```http
  PUT /api/user/todos/:id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

#### Get Access to User Info

## Authors

- [@Ulysseassoo](https://github.com/Ulysseassoo)
