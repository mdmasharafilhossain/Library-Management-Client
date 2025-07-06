# Minimal Library Management System

The Minimal Library Management System is a full-stack web application built to demonstrate the core functionality of managing a book borrowing platform with a clean, responsive UI and a scalable backend API. Designed with simplicity in mind, this system serves as a foundational blueprint for larger, more complex library or inventory systems.

This project offers an end-to-end solution where users can browse, create, update, and delete book records, borrow available books, and view a real-time summary of borrow statistics—all without needing to authenticate or deal with role-based access control. It is intended to focus on the essential features that make a digital library functional and interactive.

The frontend is built using **React and TypeScript**, with **Redux Toolkit Query (RTK Query)** to handle state management and API interactions efficiently. The backend is developed with **Node.js, Express, and MongoDB** following the **MVC (Model-View-Controller)** architecture for maintainability and scalability.

---

## Key Features

- **Public Access**  
  All routes (Books, Borrow, Summary) are publicly accessible—no login or authentication required.

- **Book Management**  
  Users can easily **add**, **view**, **edit**, and **delete** books. The UI updates instantly after each action.

- **Borrowing System**  
  Borrow books with a specified **quantity** and **due date**. The system automatically handles:
  - Quantity validation (you can’t borrow more than available)
  - Setting availability to "No" if copies run out

- **Borrow Summary**  
  Displays a summarized report of borrowed books with **total quantities**, powered by MongoDB’s aggregation pipeline.

- **Pagination & Sorting Support**  
  API allows pagination and sorting using query params:  
   
- **Responsive Layout**   
Fully responsive layout using **Tailwind CSS**—works on mobile, tablet, and desktop devices.
- **Toast Notifications** *(+2 Bonus)*  
Provides **instant success or error messages** using `sweetalert2`.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React , TypeScript, Vite, Tailwind CSS |
| State / API | Redux Toolkit & RTK Query |
| Backend | Node , Express , TypeScript |
| Database | MongoDB , Mongoose |
| Tooling | ESLint, Prettier |

---

## Live Demo

| App | URL |
|-----|-----|
| **Live** | <https://library-management-sigma-nine.vercel.app/>> |




---




---

## Local Setup

```bash
# 1. Clone  repos 
git clone https://github.com/mdmasharafilhossain/Library-Management-Client.git
cd Library-Management-Client

# 2. Install dependencies
npm install                     

# 3. Run the project
npm run dev                    

# 4. Optional: If you want to run the backend locally, visit the backend repository:
https://github.com/mdmasharafilhossain/Library-Management-API-TypeScript-Node.js


