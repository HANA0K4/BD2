const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:"mongodb+srv://hagavilon:hagaviria@cluster0.vnr5soi.mongodb.net/?retryWrites=true&w=majority"
}

export default config
