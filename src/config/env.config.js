import "dotenv/config"

export const mongourl= process.env.MONGO_URL
export const port= process.env.PORT
export const jwtsecret= process.env.JWT_SECRET
export const refreshsecrete= process.env.REFRESH_TOKEN_SECRET
export const stripe_secrete_key= process.env.STRIPE_SECERET_KEY
export const success_url= process.env.SUCCESS_URL
export const cancel_url= process.env.CANCEL_URL
export const api_key= process.env.API_KEY
