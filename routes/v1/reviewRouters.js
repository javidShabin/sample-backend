const express = require('express')
const { userAuthentication } = require('../../middlewares/userAuth')
const { getreviews, createReview } = require('../../controllers/reviewController')
const router = express.Router()

// Add review
router.post('/reviews', userAuthentication, createReview)
// Get reviews
router.get('/reviews', getreviews)

module.exports = {reviewRouter: router}