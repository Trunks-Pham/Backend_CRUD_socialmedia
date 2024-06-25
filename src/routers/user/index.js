const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

// Tạo người dùng
router.post('/create-user', userController.createUser);

//Hiển thị tất cả thông tin người dùng
router.get('/get-user', userController.getAllUsers);

// Tìm người dùng và thông tin bài viết theo ID
router.get('/get-user-detail/:id', userController.getUserDetail);

// Cập nhật người dùng theo ID
router.put('/update-user/:id', userController.updateUser);

// Xóa người dùng theo ID
router.delete('/delete-user/:id', userController.deleteUser);

// Tìm người dùng theo tên
router.get('/search-user', userController.searchUserByName);

// Tìm người dùng theo email
router.get('/search-user-by-email', userController.searchUserByEmail);

// Kiểm tra server
router.get('/test', userController.testServer);

module.exports = router;
