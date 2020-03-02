const authRoutes = require('./auth.routes');
module.exports = (app) => {
  app.use('/auth/user', authRoutes)
}