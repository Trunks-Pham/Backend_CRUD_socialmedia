const Post = require("../models/post.model");
const userModel = require("../models/user.model");

// Tạo một bài viết mới
exports.createPost = async (req, res) => {
    const { title, content, dateCreated, userId } = req.body;

    try {
        const post = new Post({
            title,
            content,
            dateCreated,
            userId
        });

        const newPost = await post.save();

        // Cập nhật danh sách bài viết của người dùng
        const user = await userModel.findById(userId);
        user.posts.push(newPost._id);
        await user.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Lấy tất cả các bài viết
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'name'); // Populate user info
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy một bài viết cụ thể theo ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('userId', 'name email phoneNumber nickName');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Cập nhật một bài viết hiện có
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Xóa một bài viết
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.remove();

        // Xóa bài viết khỏi danh sách bài viết của người dùng
        const user = await userModel.findById(post.userId);
        user.posts.pull(post._id);
        await user.save();

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Middleware để lấy một bài viết cụ thể theo ID
exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.post = post;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
