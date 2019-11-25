import mongoose, { Document } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: Number,
  username: String,
  visits: Array,
  transactions: Array
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
