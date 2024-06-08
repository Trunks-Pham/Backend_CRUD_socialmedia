const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post.controller");

// Lấy tất cả các bài viết
router.get('/', postController.getAllPosts);

// Lấy một bài viết cụ thể theo ID
router.get('/:id', postController.getPost, postController.getPostById);

// Tạo một bài viết mới
router.post('/', postController.createPost);

// Cập nhật một bài viết hiện có
router.put('/:id', postController.getPost, postController.updatePost);

// Xóa một bài viết
router.delete('/:id', postController.getPost, postController.deletePost);

module.exports = router;
