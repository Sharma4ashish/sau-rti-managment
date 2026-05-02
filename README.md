# RTI Management Dashboard

A full-stack RTI (Right to Information) management system with pagination, filtering, status updates, and document handling.

---

## 🚀 Features

* 📄 RTI Listing with Pagination
* 🔍 Filter by Date, Department, Status
* ➕ Create New RTI
* ✏️ Edit RTI Details
* 🗑️ Delete RTI with Confirmation
* 🔄 Inline Status Update (Optimistic UI)
* 📁 File Upload Support
* ⚡ Toast Notifications

---
## Further improvements ideas
will use Redux 
create Reusable form for update and create feat and while updating only allowed required field to edit rest will be disabled 
A single reusable form component that supports both Create and Update workflows.
create → all fields editable
edit → only selected fields editable


## 🛠️ Tech Stack

**Frontend:**

* React (Vite)
* Tailwind CSS
* React Hook Form
* React Hot Toast

**Backend:**

* Node.js
* MongoDB
* Zod Validation

---

## 📸 Screenshots

### 📊 RTI List Page

![RTI List](./docs/views/List%20RTis.png)

### ➕ Create RTI

![Create RTI](./docs/views/Create%20Rti.png)

### 🔍 Filtering

![Filtering](./docs/views/filttering.png)

### ⚠️ Validation

![Validation](./docs/views/Required%20Field.png)

---

## 🎥 Demo Videos (Watch App Flow)

### 📊 RTI Dashboard Overview

[![RTI Dashboard](https://img.youtube.com/vi/8AdD8h079Wg/0.jpg)](https://youtu.be/8AdD8h079Wg)

### 🔄 Full RTI Flow

[![RTI Flow](https://img.youtube.com/vi/lIMRpqVSvFM/0.jpg)](https://youtu.be/lIMRpqVSvFM)

---

![RTI List](./docs/rti.postman_collection.json)



## ⚙️ Installation

### Clone the repo

```bash
git clone https://github.com/your-username/rti-dashboard.git
cd sau-rti-managment
```

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

### Run Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🔗 API Endpoints

* GET `/rtis` → Get paginated RTIs
* GET `/rtis/:id` → Get single RTI
* POST `/rtis` → Create RTI
* DELETE `/rtis/:id` → Delete RTI
* PATCH `/rtis/:id/status` → Update status

---

## ✨ Highlights

* Optimistic UI updates for delete & status change
* Clean separation of concerns using custom hooks
* Reusable form components
* Efficient pagination & filtering
* Backend-driven RTI number generation

---

## 🧠 Challenges & Learnings

* Handling pagination with filters
* Managing optimistic UI updates
* Designing reusable form components
* Debugging API integration issues
