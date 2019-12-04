import mongoose from 'mongoose';

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  transactionId: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Transaction', TransactionSchema);
