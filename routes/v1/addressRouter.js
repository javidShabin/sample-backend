const express = require('express')
const { createAddress, updateAddress, getAddress, deleteAddress } = require('../../controllers/addressController')
const { userAuthentication } = require('../../middlewares/userAuth')
const router = express.Router()

// Create address
router.post('/address', userAuthentication, createAddress)
// Ppdate address
router.put('/address/:id', updateAddress)
// Get address
router.get('/address', userAuthentication, getAddress)
// Delete address
router.delete('/address/:id', userAuthentication, deleteAddress)

module.exports = {addressRouter: router}