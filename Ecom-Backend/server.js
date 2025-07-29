require('dotenv').config();
const express  = require('express');
const connectDB = require('./Confiq/db');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const cartRoutes=require('./Routes/cartRoutes')
const orderRoutes=require('./Routes/orderRoutes')

const app = express();



// Enable JSON parsing
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));


// Database connection
connectDB();
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order' ,orderRoutes)

app.listen(3000, () => {
  console.log("server Started");
});
