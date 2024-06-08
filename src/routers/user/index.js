// const express = require("express");
// const router = express.Router();

// const userModel = require("../../models/user.model");

// router.post('/create-user',async (req, res) => {
//     const { name, email } = req.body; 
//     console.log("req.body:",req.body)

//     const user = new userModel({
//         name,
//         email
//     });
//     await user.save()
//     return res.json({
//         message: 'user created successfully'
//     });
          
// });

// router.get('/get-user-detail/:id', (req, res) => {
//     const { id } = req.params;

//     userModel.findById(id)
//         // .populate.findById(id)
//         .then((user) => {
//             res.send(user);
//         })
//         .catch((err) => {
//             res.status(500).send(err);
//         });
// });

// router.get('/test', (req, res) => {
//     res.send('test');
// });

// module.exports = router;

//==============================================

const express = require("express");
const router = express.Router();

const userModel = require("../../models/user.model");

// Thêm người dùng mới
router.post('/create-user', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Missing name or email field' });
    }

    try {
        const user = new userModel({
            name,
            email
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