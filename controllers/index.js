const router = require('express').Router();

const htmlRoutes = require('./html-routes')
const userRoute = require('./user-routes')
const blogRoute = require('./blog-api-routes')

router.use('/', htmlRoutes);
router.use('/api/user', userRoute)
router.use('/api/blog', blogRoute)

module.exports = router;