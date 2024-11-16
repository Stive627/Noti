const express = require('express')
const router = express.Router()

exports.register = router.post('/register', )
exports.login = router.post('/login')
exports.logout = router.post('/logout')
exports.deleteAccount = router.delete('/deleteAccount')

module.exports = router