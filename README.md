# 🛍️ Vibe Commerce

A modern full-stack e-commerce cart application built with React and Node.js.

![Made with React](https://img.shields.io/badge/Made_with-React-61DAFB?logo=react&logoColor=white)
![Made with Node.js](https://img.shields.io/badge/Made_with-Node.js-43853D?logo=node.js&logoColor=white)
![Made with MongoDB](https://img.shields.io/badge/Made_with-MongoDB-47A248?logo=mongodb&logoColor=white)

## 🌟 Features

- **Product Browsing**: Clean grid layout with product cards
- **Shopping Cart**: Real-time cart management
- **Checkout Flow**: Streamlined checkout process
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Material-UI components with custom styling

Quick map
---------
- Frontend: React (Create React App) — serves UI on http://localhost:3000
- Backend: Node.js + Express + MongoDB — API typically runs on http://localhost:5000

## 📁 Project Structure

```
vibe-com-cart/
│
├── backend/                 # Node.js + Express API
│   ├── controllers/        # Route controllers
│   │   ├── cartController.js
│   │   ├── checkoutController.js
│   │   └── productController.js
│   │
│   ├── middleware/         # Express middleware
│   │   └── errorMiddleware.js
│   │
│   ├── models/            # MongoDB models
│   │   ├── Cart.js
│   │   └── Product.js
│   │
│   ├── routes/            # API routes
│   │   ├── cartRoute.js
│   │   ├── checkoutRoute.js
│   │   └── productRoute.js
│   │
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
│
└── frontend/              # React application
    ├── public/           # Static files
    │   ├── index.html
    │   ├── manifest.json
    │   └── favicon.ico
    │
    └── src/              # React source code
        ├── components/   # Reusable components
        │   ├── CartView.js
        │   ├── CheckoutForm.js
        │   ├── Footer.js
        │   ├── Navbar.js
        │   ├── ProductCard.js
        │   ├── ProductGrid.js
        │   └── ReceiptModal.js
        │
        ├── contexts/    # React contexts
        │   └── CartContext.js
        │
        ├── hooks/      # Custom React hooks
        │   └── useIntersectionObserver.js
        │
        ├── pages/      # Page components
        │   ├── CartPage.js
        │   ├── CheckoutPage.js
        │   ├── HomePage.js
        │   └── ProductsPage.js
        │
        ├── utils/      # Utility functions
        │   └── format.js
        │
        ├── App.css    # Global styles
        ├── App.js     # Root component
        └── index.js   # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm (comes with Node.js)
- MongoDB (local or Atlas)

### Environment Setup

1. Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/vibe-com-cart
NODE_ENV=development
```

### Installation

1. **Clone the repository:**
   ```powershell
   cd your-projects-folder
   git clone https://github.com/Vijayaa21/vibe-com-cart.git
   cd vibe-com-cart
   ```

2. **Install backend dependencies:**
   ```powershell
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```powershell
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server:**
   ```powershell
   cd backend
   npm run dev
   ```
   Backend will run on http://localhost:5000

2. **Start the frontend (in a new terminal):**
   ```powershell
   cd frontend
   npm start
   ```
   Frontend will open on http://localhost:3000

## 🔌 API Endpoints

### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product

### Cart

- `GET /api/cart` - View cart contents
- `POST /api/cart` - Add item to cart
  ```json
  {
    "productId": 1,
    "quantity": 1
  }
  ```
- `PATCH /api/cart/:productId` - Update quantity
  ```json
  {
    "quantity": 2
  }
  ```
- `DELETE /api/cart/:productId` - Remove item from cart


Troubleshooting
---------------
- Server errors / 500: check backend terminal logs for stack traces.
- MongoDB connection errors: ensure `MONGO_URI` is correct and MongoDB is running.
- Frontend shows stale styles or favicon: do a hard refresh (Ctrl+F5) or clear cache.
- If ports conflict, change `PORT` in `.env` or `package.json` scripts.

Development tips
----------------
- You can run backend and frontend concurrently in separate terminals.
- When editing CSS in `frontend/src/App.css`, the React dev server usually reloads automatically.
- To test API quickly without the frontend, Postman or curl are convenient for exercising endpoints.

Next steps
-------------------------
- Add user authentication and per-user carts (currently the app uses a single development userId).
- Add product CRUD admin pages.
- Improve seeding and add an explicit `npm run seed` script if needed.



