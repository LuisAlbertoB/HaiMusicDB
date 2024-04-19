const mongoose = require('mongoose');

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        user_name: String,
        first_name: String,
        last_name: String,
        cellphone: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role",
            }
        ],
        liked_list: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "LikedList",
            }
        ],
        fav_list: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FavList",
            }
        ]
    })
);

module.exports = User;