import { bot } from '../bot';
import statusTrn from '../constants/statusTransactions';
import { messages } from '../messages';

const messsageOptions = {
  parse_mode: 'HTML',
  disable_web_page_preview: true,
};

class Notifyer {
  constructor(recepientId, payload) {
    if (Notifyer.instance instanceof Notifyer) {
      return Notifyer.instance;
    }

    this.recepientId = recepientId;
    this.messages = [];
    this.payload = payload || {};

    return this;
  }

  _createMessagesByStatus() {
    if (this.payload.status === statusTrn.waiting) {
      this.messages = [`Transaction ID - <b>${this.payload.id}</b>.`, messages[this.payload.status]];
      return;
    }

    if (this.payload.status === statusTrn.finished) {
      this.messages = [
        this.payload.payoutHash,
        `Yay! The transaction is successfully finished. Your <b>${this.payload.toCurrency.toUpperCase()}</b> have been sent to your wallet.\nThank you for choosing ChangeNOW - hope to see you again soon!`
      ];
      return;
    }

    this.messages = messages[this.payload.status] ? [messages[this.payload.status]] : [];
  };

  addRecepient(recepientId) {
    this.recepientId = recepientId;
    return this;
  };

  addPayload(payload) {
    this.payload = payload;
    return this;
  };

  async sendNotify() {
    this._createMessagesByStatus();

    const promises = this.messages.map(async message => {
      await bot.telegram.sendMessage(this.recepientId, message, messsageOptions);
    });

    await Promise.all(promises);
  };

}

export default new Notifyer();

