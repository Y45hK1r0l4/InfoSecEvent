# InfoSec Events

InfoSec Events is a modern event discovery and management platform built with Next.js, React, TypeScript, and MongoDB for the Information Security community. Users can explore cybersecurity conferences, workshops, CTFs, and meetups, while organizers can create, manage, update, and delete their own events through a secure, authenticated dashboard.

---

## ✨ Features

### 🔐 Authentication
- JWT Authentication
- Secure HttpOnly Cookies
- Password Hashing with bcrypt
- Protected Routes
- User Authorization

### 📅 Event Management
- Create Event
- Edit Event
- Delete Event
- View Event Details
- View Similar Events
- My Events Dashboard
- Event Booking
- Booking Count

### 🖼️ Image Upload
- Cloudinary Integration
- Image Preview
- Automatic Image Upload

### 🏷️ Event Information
- Title
- Description
- Overview
- Date & Time
- Venue & Location
- Online / Offline / Hybrid Mode
- Tags
- Agenda
- Organizer Information

### 🔒 Security
- Ownership-based Authorization
- Protected API Routes
- JWT Verification
- Server-side Validation
- Mongoose Validation

---

## 🚀 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js Route Handlers
- MongoDB
- Mongoose

### Authentication
- JWT
- bcrypt

### Storage
- Cloudinary

---

## 📂 Project Structure

```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/infosec-events.git
```

```bash
cd infosec-events
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env.local` file.

```env
MONGODB_URI=

JWT_SECRET=

NEXT_PUBLIC_BASE_URL=http://localhost:3000

CLOUDINARY_URL=
```

### Run Development Server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 📸 Screenshots

### Home Page

<img width="1901" height="980" alt="image" src="https://github.com/user-attachments/assets/0bfe57cd-500a-46bf-ae60-5909b082ce72" />


### Event Details

<img width="1902" height="976" alt="image" src="https://github.com/user-attachments/assets/4c3df138-8420-4069-ba53-7d80cc979156" />

<img width="1896" height="972" alt="image" src="https://github.com/user-attachments/assets/7bc0a5ee-3890-4f11-989d-d1d0a0836e39" />


### Create Event

<img width="1901" height="980" alt="image" src="https://github.com/user-attachments/assets/9ecc3ab3-79d4-449b-84d1-e293324b86fe" />


### My Events

<img width="1917" height="971" alt="image" src="https://github.com/user-attachments/assets/45a2da9a-f9d3-40d7-bc16-52132a7690ae" />


### Login

<img width="1910" height="873" alt="image" src="https://github.com/user-attachments/assets/3c05e270-74e7-48af-8524-0f4dafbeb36e" />


---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Register User |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/profile` | Current User |

---

### Events

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/events` | Get All Events |
| POST | `/api/events` | Create Event |
| GET | `/api/events/[slug]` | Get Event |
| PATCH | `/api/events/[slug]` | Update Event |
| DELETE | `/api/events/[slug]` | Delete Event |

---

### Bookings

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/bookings` | Book Event |
| GET | `/api/bookings/[eventId]` | Booking Count |

---

## 🔐 Authorization Rules

- Only authenticated users can create events.
- Only the event owner can edit an event.
- Only the event owner can delete an event.
- Protected routes require a valid JWT.

---

## Author

**Yash Kirola**

- GitHub: https://github.com/Y45hK1r0l4
