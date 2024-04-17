import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: { type: Number, required: true },
  username: { type: String },
  visits: [{ type: Schema.Types.ObjectId, ref: "Visit" }],
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  lang: { type: String, required: true },
});

export default mongoose.model("NUser", UserSchema);
