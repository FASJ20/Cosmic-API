import "dotenv/config"
export const mongourl= process.env.MONGO_URL
export const port= process.env.port
export const jwtsecret= process.env.JWT_SECRET
export const refreshsecrete= process.env.REFRESH_TOKEN_SECRET