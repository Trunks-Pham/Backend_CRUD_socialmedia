const express = require("express");
const router = express.Router();

const userModel = require("../../models/user.model");

// Thêm người dùng mới
router.post('/create-user', async (req, res) => {
    const { name, email,phoneNumber,nickName } = req.body;

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
});



// Lấy thông tin người dùng theo ID
router.get('/get-user-detail/:id', (req, res) => {
    const { id } = req.params;

    userModel.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.send(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
});

// // Lấy thông tin người dùng theo ID và các bài đăng của họ
// router.get('/get-user-detail/:id', (req, res) => {
//     const { id } = req.params;

//     userModel.findById(id)
//         .then((user) => {
//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }

//             // Tìm tất cả các bài đăng của người dùng
//             postModel.find({ userId: id })
//                 .then((posts) => {
//                     // Gửi thông tin người dùng và các bài đăng của họ
//                     res.json({ user, posts });
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                     res.status(500).send(err);
//                 });
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send(err);
//         });
// });


// Sửa thông tin người dùng
router.put('/update-user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    // Kiểm tra xem dữ liệu có hợp lệ không
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
});

// Xóa người dùng
router.delete('/delete-user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json({
            message: 'User deleted successfully',
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

// Tìm kiếm người dùng theo tên
router.get('/search-user', async (req, res) => {
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
});

// Tìm kiếm người dùng theo email
router.get('/search-user-by-email', async (req, res) => {
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
});


// Route kiểm tra server hoạt động
router.get('/test', (req, res) => {
    res.send('test');
});

module.exports = router;