module.exports = {
  server: {
    port: process.env.PORT || 3000,
    host: "localhost",
  },
  session: {
    secret: process.env.SESSION_SECRET || "household-task-manager-secret-key-2024",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      sameSite: "lax",
    },
  },
  app: {
    name: "Household Task Management System",
    version: "1.0.0",
  },
}
