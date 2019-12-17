import TransactionModel from '../models/Transaction';
import { getTransactionStatus } from '../api';
import statusTrn from '../constants/statusTransactions';
import Notifyer from './Notifyer';

class StatusWorker {
  constructor(interval) {
    if (StatusWorker.instance instanceof StatusWorker) {
      return StatusWorker.instance;
    }

    StatusWorker.instance = this;

    this.transactions = [];
    this.timer = null;
    this.interval = interval || 15000;

    return this;
  };

  async _getTransactions() {
    this.transactions = await TransactionModel.find({ status: { $in: [statusTrn.new, statusTrn.waiting, statusTrn.confirming, statusTrn.exchanging] } }).populate('owner', 'userId');
  };

  async _changeTrnStatus({ id, status }) {
    await TransactionModel.findOneAndUpdate({ transactionId: id }, { status });
  };

  _transactionWasChanged(prevTrn, nextTrn) {
    return nextTrn.status && nextTrn.status !== prevTrn.status;
  };

  async _checkTrnStatus() {
    const promises = this.transactions.map(async t => {
      const updatedTrn = await getTransactionStatus(t.transactionId);

      if (updatedTrn && this._transactionWasChanged(t, updatedTrn)) {
        await Notifyer.addRecepient(t.owner.userId).addPayload(updatedTrn).sendNotify();
        await this._changeTrnStatus(updatedTrn);
      }
    });

    await Promise.all(promises);

    console.log('re-run worker');
    setTimeout(async () => await this.run(), this.interval);
  };

  async run() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    await this._getTransactions();
    await this._checkTrnStatus();
  };

}

export default new StatusWorker();
