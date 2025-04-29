# Ecommerce App

## Overview

This is a modern, full-stack e-commerce application built with cutting-edge web technologies, providing a robust and scalable solution for online shopping.

## Features

### Authentication System

- Secure user authentication and authorization
- Protected routes
- Login and registration functionality
- Token-based authentication management

### Frontend Technologies

- React with TypeScript
- State management
- Responsive design
- Client-side routing

### Backend Technologies

- Express.js
- PostgreSQL
- Node.js
- TypeScript
- Knex.js
- bcrypt
- cors
- dotenv
- express-validator
- jsonwebtoken
- nodemailer
- pg
- postcss
- tailwindcss

## Project Structure

```tree
ecommerce-app/
│
├── frontend/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── NewListing.tsx
│   │   ├── Product.tsx
│   │   └── User.tsx
│   │   └── ui/
│   │       └── infinite-moving-cards.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── pages/
│   ├── public/
│   ├── services/
│   └── styles/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── valMiddleware.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── seeds/
│   ├── tests/
│   │   ├── auth.test.js
│   │   └── product.test.js
│   ├── utils/
│   │   └── sendVerificationEmail.js
│   ├── app.js
│   ├── knexfile.js
│   ├── package.json
│   └── server.js
│
├── docker-compose.yml
└── README.md
```

## Setup and Installation

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- [Any other dependencies]

### Installation Steps

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   cd ecommerce-app
   ```

2. Install frontend dependencies

   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies

   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables

   - Create `.env` files in frontend and backend directories
   - Add necessary configuration (API keys, database connection, etc.)

## Authentication Flow

- Users can register and create an account
- Secure login with token-based authentication
- Protected routes prevent unauthorized access
- Local storage used for managing user sessions

## Running the Application

### Development Mode

1. Start frontend

   ```bash
   cd frontend
   npm start
   ```

2. Start backend

   ```bash
   cd backend
   npm run dev
   ```

### Production Build

1. Build frontend

   ```bash
   cd frontend
   npm run build
   ```

2. Build backend

   ```bash
   cd backend
   npm run build
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License

## Security

- Token-based authentication
- Client-side route protection
- Secure API calls

## Future Improvements

- [ ] Add more comprehensive error handling
- [ ] Implement advanced state management
- [ ] Add more authentication features (2FA, OAuth)

## Support

For any questions or issues, please open a GitHub issue or contact [rcatullo@stanford.edu](mailto:rcatullo@stanford.edu).
