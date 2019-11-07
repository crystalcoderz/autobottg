import mongoose, { Document } from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    id: Number,
    username: String,
    transactions: [
      {
        userId: String,
        from: String,
        to: String,
        address: String,
        amount: Number,
        extraId: String
      }
    ]
  }
);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;