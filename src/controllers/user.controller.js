const userModel = require("../models/user.model");
const Post = require("../models/post.model");

// Thêm người dùng mới
exports.createUser = async (req, res) => {
    const { name, email, phoneNumber, nickName } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Missing name or email field' });
    }

    try {
        const user = new userModel({
            name, email, phoneNumber, nickName 
        });

        await user.save();
        return res.json({
            message: 'User created successfully'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

// Lấy tất cả người dùng và bài viết của họ
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).populate('posts');
        // Mảng để chứa tất cả thông tin người dùng và bài viết của họ
        const usersAndPosts = await Promise.all(users.map(async (user) => {
            const posts = await Post.find({ userId: user._id });
            return { user, posts };
        }));
        res.json(usersAndPosts);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


// Lấy thông tin người dùng theo ID
exports.getUserDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findById(id).populate('posts');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const posts = await Post.find({ userId: id });

        res.json({
            user,
            posts
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

// Sửa thông tin người dùng
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Missing name or email field' });
    }

    try {
        const user = await userModel.findByIdAndUpdate(id, { name, email }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json({
            message: 'User updated successfully',
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Xóa bài viết của người dùng
        await Post.deleteMany({ userId: id });

        return res.json({
            message: 'User and associated posts deleted successfully',
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

// Tìm kiếm người dùng theo tên
exports.searchUserByName = async (req, res) => {
    const { name } = req.query;

    try {
        const users = await userModel.find({ name: { $regex: name, $options: 'i' } });

        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        return res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

// Tìm kiếm người dùng theo email
exports.searchUserByEmail = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

// Route kiểm tra server hoạt động
exports.testServer = (req, res) => {
    res.send('test');
};
