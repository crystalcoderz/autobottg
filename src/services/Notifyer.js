import { bot } from "../bot";
import statusTrn from "../constants/statusTransactions";
import { messages } from "../messages";
import { pause } from "../helpers";
import { lang } from "../translation/config";
import fs from "fs";
import yaml from "yaml";
import path from "path";

const messsageOptions = {
  parse_mode: "HTML",
  disable_web_page_preview: true,
};

class Notifyer {
  constructor(recepientId, payload) {
    if (Notifyer.instance instanceof Notifyer) {
      return Notifyer.instance;
    }
    this.lang = "en";
    this.recepientId = recepientId;
    this.messages = [];
    this.payload = payload || {};
    this.locales = yaml.parse(
      fs.readFileSync(
        path.resolve(
          __dirname,
          `../translation/assets/locales/${this.lang}.yaml`
        ),
        "utf-8"
      )
    );
    this.statuses = {
      new: this.locales.new,
      waiting: this.locales.waiting,
      confirming: this.locales.confirming,
      exchanging: this.locales.exchanging,
      sending: this.locales.sending,
      finished: this.locales.finished,
      refunded: this.locales.refunded,
      verifying: this.locales.verifying,
      failed: this.locales.failed,
      expire: this.locales.expire,
    };

    return this;
  }

  _createMessagesByStatus() {
    if (this.payload.status === statusTrn.sending) {
      this.messages = [];
      return;
    }

    if (this.payload.status === statusTrn.finished) {
      const {
        amountReceive,
        expectedReceiveAmount,
        payoutHash,
        linkMask,
        toCurrency,
      } = this.payload;

      let messageByAmount;

      messageByAmount =
        amountReceive <= expectedReceiveAmount
          ? `${this.locales.serviceSend1} <b>${toCurrency.toUpperCase()}</b> ${
              this.locales.serviceSend2
            }`
          : `${this.locales.serviceReceive1}  ${(
              amountReceive - expectedReceiveAmount
            ).toFixed(8)} <b>${toCurrency.toUpperCase()}</b> ${
              this.locales.serviceReceive2
            } ${
              this.locales.serviceSend1
            } ${amountReceive} <b>${toCurrency.toUpperCase()}</b> ${
              this.locales.serviceSend2
            }`;

      this.messages = [
        `${this.locales.serviceSuccess1} ${messageByAmount}\n\n${this.locales.serviceSuccess2} ${process.env.LABEL} ${this.locales.serviceSuccess3}`,
        `<a href="${linkMask.replace("$$", payoutHash)}">${payoutHash}</a>`,
      ];

      return;
    }
    this.messages = this.statuses[this.payload.status]
      ? [`${this.statuses[this.payload.status]}`]
      : [];
  }

  addRecepient(recepientId) {
    this.recepientId = recepientId;
    return this;
  }

  addPayload(payload) {
    this.payload = payload;
    return this;
  }

  addLang(lang) {
    this.lang = lang;
    this.locales = yaml.parse(
      fs.readFileSync(
        path.resolve(__dirname, `../translation/assets/locales/${lang}.yaml`),
        "utf-8"
      )
    );
    this.statuses = {
      new: this.locales.new,
      waiting: this.locales.waiting,
      confirming: this.locales.confirming,
      exchanging: this.locales.exchanging,
      sending: this.locales.sending,
      finished: this.locales.finished,
      refunded: this.locales.refunded,
      verifying: this.locales.verifying,
      failed: this.locales.failed,
      expire: this.locales.expire,
    };
    return this;
  }

  async sendNotify() {
    this._createMessagesByStatus();

    if (this.messages.length) {
      const promises = this.messages.map(async (message) => {
        await bot.telegram.sendMessage(
          this.recepientId,
          message,
          messsageOptions
        );
        await pause(500);
      });

      await Promise.all(promises);
    }
  }
}

export default new Notifyer();
