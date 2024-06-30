const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/Db");
const authRouter = require("./Routes/auth-router");
const adminRouter= require("./Routes/admin-router");
const errormiddleware= require("./Middleware/error-middleware")
const productRouter= require("./Routes/Product-router")
const userRouter= require("./Routes/User-router")
const paymentRouter= require("./Routes/Payment-route")
const orderRouter= require("./Routes/order-router");
const razorpay = require("razorpay")


dotenv.config();


app.use(cors({ origin: "http://localhost:5173" , credentials: true }));

app.use(express.json());






app.use("/api/auth", authRouter);
app.use("/api/admin",adminRouter)
app.use("/api/product",productRouter)
app.use("/api/user",userRouter)
app.use("/api/payment/", paymentRouter)
app.use("/api/order",orderRouter)

app.use(errormiddleware)



app.get("/api/getKey", (req, res)=>
res.status(201).json({key: process.env.RAZORPAY_API_KEY}))
app.listen(8000, () => {
  connectDB();
  console.log("server running at port 8000");
});
