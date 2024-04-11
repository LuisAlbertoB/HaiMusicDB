const mongoose = require("mongoose");

const UserHasRole = mongoose.model(
  "UserHasRole",
  new mongoose.Schema({
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        }
    ],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
  })
);

module.exports = UserHasRole;