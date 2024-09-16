const express = require('express')
const { createAdmin, loginAdmin, updateAdmin, logoutAdmin, checkAdmin } = require('../../controllers/adminController')
const { adminAuthentication } = require('../../middlewares/adminAuth')
const router = express.Router()
// Admin registration
router.post("/register", createAdmin)
// Admin login
router.post("/login", loginAdmin)
// Logout admin
router.post("/logout", logoutAdmin)
// Update admin
router.put("/update/:id", adminAuthentication, updateAdmin)
// check admin
router.get("/check-admin", adminAuthentication, checkAdmin)

module.exports = {adminRouter: router}