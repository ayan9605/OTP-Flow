Here is a beautifully formatted, comprehensive `README.md` file. You can easily copy the entire block below and paste it directly into your project.

```markdown
# 🔐 Nodrix OTP Authentication API

> A production-ready, highly secure OTP authentication service built with Node.js, Express, Redis Cloud, and custom cPanel SMTP. 

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

---

## ✨ Key Features

*   **⚡ High Performance:** Built on Express.js with Redis Cloud for lightning-fast OTP validation.
*   **🛡️ Enterprise Security:** Implements rate limiting, 60-second spam cooldowns, helmet headers, and max-attempt brute-force protection.
*   **✉️ Beautiful Emails:** Responsive, card-style HTML email templates with fallback plain-text versions optimized for all major clients (Gmail, Outlook).
*   **🔄 Dynamic Context:** Distinct authentication flows and email templates for `register` and `forgot-password` actions.
*   **🚀 Deploy-Ready:** Includes `render.yaml` for instant zero-config deployment on Render.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js & Express** | Core server and API routing |
| **Redis Cloud** | Fast, temporary state management (OTP storage & expiry) |
| **Nodemailer** | SMTP integration via custom `mail.nodrix.in` |
| **express-rate-limit** | IP-based request limiting to prevent API abuse |
| **Crypto (Native)** | Cryptographically secure 6-digit OTP generation |

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js (v16 or higher)
*   A Redis Cloud account/URL
*   Custom SMTP credentials (cPanel)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone [https://github.com/yourusername/nodrix-otp-api.git](https://github.com/yourusername/nodrix-otp-api.git)
cd nodrix-otp-api
npm install

```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
NODE_ENV=development

# Redis
REDIS_URL=redis://default:your-secure-password@your-redis-host:port

# Custom SMTP
SMTP_HOST=mail.nodrix.in
SMTP_PORT=465
SMTP_USER=no-reply@nodrix.in
SMTP_PASS=your_email_password
SMTP_FROM_NAME="Nodrix Security"
SMTP_FROM_EMAIL="no-reply@nodrix.in"

```

### 4. Run the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

```

---

## 📡 API Reference

### 1. Send OTP

Generates a secure 6-digit OTP and sends it to the user's email. Includes a 60-second cooldown.

* **URL:** `/api/auth/send-otp`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`

**Request Body:**

```json
{
    "email": "user@example.com",
    "type": "register" 
}

```

*(Note: `type` must be either `register` or `forgot-password`)*

**Success Response (200 OK):**

```json
{
    "success": true,
    "message": "OTP sent successfully to your email."
}

```

**Error Response (429 Too Many Requests):**

```json
{
    "success": false,
    "message": "Please wait 60 seconds before requesting a new OTP."
}

```

### 2. Verify OTP

Validates the OTP. Fails after 3 incorrect attempts and deletes the OTP upon success.

* **URL:** `/api/auth/verify-otp`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`

**Request Body:**

```json
{
    "email": "user@example.com",
    "otp": "123456",
    "type": "register"
}

```

**Success Response (200 OK):**

```json
{
    "success": true,
    "message": "Email verified successfully."
}

```

**Error Response (400 Bad Request):**

```json
{
    "success": false,
    "message": "Invalid OTP. You have 2 attempts left."
}

```

---

## 📂 Project Structure

```text
nodrix-otp-api/
├── config/             # Database and SMTP configurations
├── controllers/        # Route logic and request handling
├── routes/             # API endpoint definitions
├── services/           # Core business logic (Email & OTP state)
├── utils/              # Helpers (Generators, Email HTML templates)
├── .env.example        # Environment variable template
├── render.yaml         # Render deployment blueprint
└── server.js           # Application entry point

```

---

## ☁️ Deployment (Render)

This project is pre-configured for Render.

1. Connect your GitHub repository to Render.
2. Select **Blueprint** and point it to the `render.yaml` file.
3. Securely add your production `SMTP_PASS` and `REDIS_URL` in the Render dashboard environment settings.

---

*Built with ❤️ for Nodrix.*

```

```
