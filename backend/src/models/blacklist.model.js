const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
    },
  },
  {
    timestamps: true,
  },
);

const tokenBlacklistModel = mongoose.model("Blacklist", blacklistTokenSchema);

// Auto-delete blacklisted tokens after 1 day (matches JWT expiry)
blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = tokenBlacklistModel;
