// const express = require("express");
// const router = express.Router();
// const userController = require("../../controllers/user.controller");

// //tạo người dùng
// router.post('/create-user', userController.createUser);
// // tìm người dùng full in tư theo id
// router.get('/get-user-detail/:id', userController.getUserDetail);
// //cập nhật người dùng theo id
// router.put('/update-user/:id', userController.updateUser);
// //xóa người dùng tư theo id
// router.delete('/delete-user/:id', userController.deleteUser);
// // tìm người dùng theo tên
// router.get('/search-user', userController.searchUserByName);
// // tìm người dùng theo email
// router.get('/search-user-by-email', userController.searchUserByEmail);
// //test
// router.get('/test', userController.testServer);

// module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

// Tạo người dùng
router.post('/create-user', userController.createUser);

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
