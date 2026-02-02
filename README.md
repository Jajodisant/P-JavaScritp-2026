# CRUDTASK - Task Management System

**CLAN:** Hamilton  
**CODER:** Jainer Pabón

A minimalist Task Management application built with **Vanilla JavaScript**, featuring a **Role-Based Access Control (RBAC)** system to streamline workflows between Managers and Employees.

---

## Features

### Role-Based Access Control (RBAC)
*   **Manager Role:** Full privileges to Create, Read, Update, and Delete (CRUD) tasks, including assigning them to specific employees.
*   **Employee Role:** A focused interface to view assigned tasks and mark them as completed.

### Core Functionalities
*   **Authentication:** Secure Login and Registration system for user onboarding.
*   **Profile Management:** View and manage personal account details.
*   **Data Persistence:** Seamless communication with a simulated REST API.

---

## Tech Stack

*   **Logic:** [Vanilla JavaScript (ES6+)](https://developer.mozilla.org)
*   **Structure:** HTML5
*   **Styling:** CSS3
*   **Mock Backend:** [JSON Server](https://www.npmjs.com) (Simulating a RESTful API)

---

## Installation & Setup

Follow these steps to get your local development environment running:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your machine.

### 2. Install and Configure JSON Server
This project uses `json-server` to act as a **Mock REST API**. This allows the application to perform real HTTP requests (GET, POST, PUT, DELETE) and persist data in the `db.json` file.

**You have two ways to set it up:**

*   **Temporary (Recommended):** Run it directly without installing it globally using `npx`:
    ```bash
    npx json-server --watch db.json --port 3000
    ```

*   **Permanent:** Install it globally on your system if you plan to use it frequently:
    ```bash
    npm install -g json-server
    # Then run:
    json-server --watch db.json --port 3000
    ```

> [!IMPORTANT]  
> The application is configured to fetch data from `http://localhost:3000`. Ensure the server is running on this specific port for the Task Management system to work correctly.


```bash
# Option: Global installation
npm install -g json-server



