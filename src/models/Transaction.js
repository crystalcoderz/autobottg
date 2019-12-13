import mongoose from 'mongoose';
import statusStransactions from '../constants/statusTransactions';

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  transactionId: { type: String, required: true },
  payinAddress: { type: String, required: true },
  payoutAddress: { type: String, required: true },
  payoutExtraId: { type: String, required: false },
  payoutHash: { type: String, required: true },
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
  amount: { type: Schema.Types.Decimal128, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: Object.keys(statusStransactions) }
});

export default mongoose.model('Transaction', TransactionSchema);
