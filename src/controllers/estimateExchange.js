import Scene from "telegraf/scenes/base";
import { keyboards } from "../keyboards";
import { messages } from "../messages";
import scenes from "../constants/scenes";
import buttons from "../constants/buttons";
import { getExchAmount } from "../api";
import { safeReply, safeReplyWithHTML } from "../helpers";
import { app } from "../app";
import UserModel from "../models/User";

let lan = "en";

const estimateExchange = new Scene(scenes.estExch);

estimateExchange.enter(async (ctx) => {
  await app.analytics.trackEstimate(ctx);
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user.lang || "en";
  ctx.i18n.locale(lan);
  const { tradingData } = ctx.session;
  const { amount, currFrom, currTo, externalIdName, extraId } = tradingData;
  const { ticker: currFromTicker } = currFrom;
  const { ticker: currToTicker } = currTo;

  const fromTo = `${currFromTicker}_${currToTicker}`;
  const { estimatedAmount } = await getExchAmount(amount, fromTo);

  if (typeof estimatedAmount !== "number") {
    await safeReplyWithHTML(ctx, ctx.i18n.t("sorryWeCatchedSomeError"));
    delete ctx.session.tradingData.amount;
    await ctx.scene.enter(scenes.amount);
    return;
  }
  if (externalIdName) {
    delete ctx.session.tradingData.externalIdName;
  }

  if (extraId) {
    delete ctx.session.tradingData.extraId;
  }

  await safeReplyWithHTML(
    ctx,
    `${ctx.i18n.t(
      "estimate1"
    )} <b>${currFromTicker.toUpperCase()}-${currToTicker.toUpperCase()}</b>. ${ctx.i18n.t(
      "estimate2"
    )} <b>${amount} ${currFromTicker.toUpperCase()}</b>; ${ctx.i18n.t(
      "estimate3"
    )} ~<b>${estimatedAmount} ${currToTicker.toUpperCase()}</b>.\n${ctx.i18n.t(
      "estimate4"
    )} <b>${currToTicker.toUpperCase()}</b> ${ctx.i18n.t("estimate5")}`,
    keyboards.getAmountKeyboard(ctx.i18n)
  );
});

estimateExchange.on("text", async (ctx) => {
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user.lang || "en";
  ctx.i18n.locale(lan);

  const { text } = ctx.message;
  const { tradingData } = ctx.session;

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

  if (text === ctx.i18n.t(buttons.back)) {
    delete ctx.session.tradingData.amount;
    await ctx.scene.enter(scenes.amount);
    return;
  }

  if (text.match(/[^()A-Za-z0-9\s]+/gi)) {
    await safeReply(ctx, ctx.i18n.t("validErr"));
    return;
  }

  ctx.session.tradingData = { ...tradingData, walletCode: text };

  await ctx.scene.enter(scenes.addInfo);
});

export default estimateExchange;
