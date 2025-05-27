module.exports = {
  server: {
    port: process.env.PORT || 3000,
    host: "localhost",
  },
  session: {
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, //24h
    },
  },
  app: {
    name: "Household Task Management System",
    version: "1.0.0",
  },
}
