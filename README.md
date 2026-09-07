# Smart Queue Management System

A basic web-based queue management system designed to reduce waiting time and make student service handling easier.

## Features

- Students can join the queue
- Automatic queue number generation
- Service selection
- View current waiting queue
- Call the next student
- Clear the queue
- FIFO (First In, First Out) queue handling

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js

## How It Works

The system follows the **FIFO (First In, First Out)** principle.

For example:

- Student A → Q1
- Student B → Q2
- Student C → Q3

When the staff selects **Call Next Student**, Q1 is served first.

## Project Structure

```text
smart-queue-management/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
