import express from "express";
import authRouter from "./routes/auth.route.js";
import productsRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import userRouter from "./routes/user.route.js";
import { dbconnect } from "./config/db.js";



dbconnect();


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users/me", userRouter)

export default app;