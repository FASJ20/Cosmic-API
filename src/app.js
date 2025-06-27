import express from "express";
import authRouter from "./routes/auth.route.js";
import productsRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import userRouter from "./routes/user.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import rateLimit from "express-rate-limit";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import { dbconnect } from "./config/db.js";
import helmet from "helmet";
import cors from "cors"
import Stripe from 'stripe';
import { stripe_secrete_key } from "./config/env.config.js";
// import apiKeyAuth from "./middleware/apiKeyAuth";

const stripe = new Stripe(stripe_secrete_key);


dbconnect()

const app = express();
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
    message: "To many request, please try again after a minute"
})





app.use(limiter);
app.use(helmet());
// app.use(cors({origin:"*"}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const file = fs.readFileSync("./docs.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users/me", userRouter);
app.use("/api/wishlist", wishlistRouter);

export default app;