# Bloomays Project

## Description

This project is a technical test for Bloomays, involving a full-stack application using React.js for the frontend and Express.js for the backend.

## Getting Started

### Backend

1. Navigate to the backend directory:

    ```sh
    cd backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the backend server:

    ```sh
    node server.js
    ```

The backend server will run on [http://localhost:3001](http://localhost:3001).

### Frontend

1. Navigate to the frontend directory:

    ```sh
    cd ../frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the frontend server:

    ```sh
    npm start
    ```

The frontend server will run on [http://localhost:3000](http://localhost:3000).

### Bonus: Airtable Integration

To integrate Airtable, follow these steps:

1. Install Airtable package:

    ```sh
    cd backend
    npm install airtable
    ```

2. Update the backend server code (`server.js`) to fetch data from Airtable.

3. Add a `.env` file in the backend directory with the following content (replace `YOUR_API_KEY` and `YOUR_BASE_ID` with your actual Airtable API key and base ID):

    ```env
    AIRTABLE_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
    AIRTABLE_BASE_ID=YOUR_BASE_ID
    ```
