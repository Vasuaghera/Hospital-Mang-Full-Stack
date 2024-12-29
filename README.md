# Hospital Management System (MERN Stack)

This project is a full-stack hospital management application built with React, Tailwind CSS, Express, and MongoDB. It includes modules for patient appointment booking, payments, an admin panel for doctor management, and a doctor panel for profile and earnings tracking.

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) Atlas account
- MongoDB Compass installed (optional for local database management)
- Git installed

---

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Vasuaghera/Hospital-Mang-Full-Stack.git
   cd Hospital-Mang-Full-Stack
   ```

2. **Install Dependencies**
   Run the following command in all three folders (`admin`, `backend`, and `frontend`):
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Each folder (`admin`, `backend`, and `frontend`) must have a `.env` file. Add the appropriate configurations:

4. **Create a MongoDB Atlas Account**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/).
   - Create a new project and set up a database cluster.
   - Obtain the connection string (e.g., `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`).

5. **Connect MongoDB with Compass (Optional)**
   - Open [MongoDB Compass](https://www.mongodb.com/products/compass).
   - Paste your MongoDB connection string to connect to the database.
   - Create a collection to store your app data.

6. **Run the Application**
   - Navigate to each folder and start the servers:
     - **Admin & Frontend**:
       ```bash
       npm run dev
       ```
     - **Backend**:
       ```bash
       npm run server
       ```

---

### Access the Application
- **Admin Panel**: `http://localhost:<port_for_admin>`
- **Frontend**: `http://localhost:<port_for_frontend>`
- **Backend API**: `http://localhost:5000`

---

## Folder Structure
```
Hospital-Mang-Full-Stack/
│
├── admin/           # Admin panel (React, Tailwind CSS)
├── backend/         # Backend server (Node.js, Express)
├── frontend/        # Frontend client (React, Tailwind CSS)
└── README.md        # Project documentation
```

---

