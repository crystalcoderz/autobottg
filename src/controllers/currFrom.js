import Scene from "telegraf/scenes/base";
import { isAvailableCurr, getCurrencyName, pause } from "../helpers";
import { getAllCurrencies, getCurrInfo, content_api } from "../api";
import { keyboards } from "../keyboards";
import scenes from "../constants/scenes";
import Transaction from "../models/Transaction";
import { safeReply, safeReplyWithHTML } from "../helpers";
import { app } from "../app";
import UserModel from "../models/User";
import { getRandom } from "../helpers";
import buttons from "../constants/buttons";

let lan = "en";

const currFrom = new Scene(scenes.currFrom);

currFrom.enter(async (ctx) => {
  await app.analytics.trackCurFrom(ctx);
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user.lang || "en";
  ctx.i18n.locale(lan);

  if (ctx.session.listenPressButton) {
    ctx.session.listenPressButton = false;
  }

  if (!ctx.session.allCurrencies) {
    ctx.session.allCurrencies = await getAllCurrencies();
  }

  ctx.session.tradingData = {};

  const { tradingData, userId } = ctx.session;

  const userTransactions = await Transaction.find({ telegramUserId: userId });

  if (userTransactions) {
    const promises = userTransactions.map(async (trn) => {
      trn.notifyEnabled = false;
      if (isNaN(trn.createdTimestamp)) {
        trn.createdTimestamp = new Date().getTime;
      }
      await trn.save();
    });

    await Promise.all(promises);
  }

  const chosenCurr = tradingData.currFrom ? tradingData.currFrom.ticker : "";
  await safeReplyWithHTML(
    ctx,
    ctx.i18n.t("selectFromMsg"),
    keyboards.getFromKeyboard(chosenCurr, ctx.i18n)
  );
});

currFrom.on("text", async (ctx) => {
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user.lang || "en";
  ctx.i18n.locale(lan);

  const { text } = ctx.message;
  if (!ctx.session.allCurrencies) {
    ctx.session.allCurrencies = await getAllCurrencies();
  }
  const { allCurrencies, tradingData } = ctx.session;
  if (text === ctx.i18n.t(buttons.cancel)) {
    ctx.session.tradingData = {};
    await ctx.scene.leave();
    await ctx.scene.enter(scenes.startNewExchange);
    return;
  }

  if (text === ctx.i18n.t(buttons.help)) {
    await safeReply(ctx, `${ctx.i18n.t("support")}\n${process.env.CN_EMAIL}`);
    return;
  }

  if (text && text.trim().length) {
    var currencyName = null;
    if (text.startsWith("/")) {
      currencyName = text.slice(-text.length + 1);
      //nop1
    } else {
      if (text.match(/^[\u{2705}]/gu)) {
        await ctx.scene.enter(scenes.currTo);
        return;
      }
      if (text.match(/[^()A-Za-z0-9\s]+/gi)) {
        await safeReply(ctx, ctx.i18n.t("validErr"));
        return;
      }
      currencyName = getCurrencyName(text);
      const currList = await content_api.proposeAwailableCurrs(currencyName);
      if (currList.length == 0) {
        const message = ctx.i18n.t(`currNotFound${getRandom(1, 12)}`, {
          text: currencyName,
        });

        await safeReply(ctx, message);
        await pause(500);
        let alternatives = await content_api.getFuzzyCurrAlternatives(text);
        let alternativesText = alternatives;
        if (alternatives.length > 0) {
          await safeReply(ctx, ctx.i18n.t("didMean") + alternativesText);
        }
        return;
      } else if (currList.length > 1) {
        await safeReply(ctx, ctx.i18n.t("multiply") + currList);
        return;
      }
    }

    const currIndex = isAvailableCurr(currencyName, allCurrencies);
    if (currIndex === -1) {
      console.log("cant find this currency:" + currencyName);
      await pause(500);
      await ctx.scene.reenter();
      return;
    }

    await safeReplyWithHTML(
      ctx,
      `${ctx.i18n.t("selected")} - <b>${allCurrencies[
        currIndex
      ].ticker.toUpperCase()}</b>.`
    );

    ctx.session.tradingData = {
      ...tradingData,
      currFrom: await getCurrInfo(allCurrencies[currIndex].ticker),
    };

    await ctx.scene.enter(scenes.currTo);
  }
});

export default currFrom;
