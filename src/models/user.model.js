const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Kiểm tra tên có hợp lệ không (không được chứa số, và có thể chứa hai từ trở lên)
                return /^\p{L}+(\s\p{L}+)*$/u.test(v); 
            },
            
            message: props => `${props.value} không phải là tên hợp lệ!`
        }
    },
    nickName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Kiểm tra xem email có hợp lệ không (phải có @ và .)
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} không phải là email hợp lệ!`
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Kiểm tra số điện thoại có hợp lệ không (sdt VN 10 số và không được chứa chữ, ký tự đặc biệt)
                return /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(v);
            },
            message: props => `${props.value} không phải là số điện thoại hợp lệ!`
        }
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }],
});

userSchema.pre('save', async function(next) {
    // Kiểm tra người dùng có tồn tại hay chưa (nếu tồn tại thì không được tạo)
    const user = await mongoose.model("User").findOne({ email: this.email });
    if (user) {
        throw new Error('Người dùng đã tồn tại!');
    }
    next();
});



module.exports = mongoose.model("User", userSchema);
