import Scene from "telegraf/scenes/base";
import { getMinimumDepositAmount } from "../api";
import { keyboards } from "../keyboards";
import { messages } from "../messages";
import scenes from "../constants/scenes";
import buttons from "../constants/buttons";
import { pause } from "../helpers";
import { safeReply, safeReplyWithHTML } from "../helpers";
import { app } from "../app";
import UserModel from "../models/User";

let lan = "en";

const amount = new Scene(scenes.amount);

amount.enter(async (ctx) => {
  await app.analytics.trackEnterAmount(ctx);
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user.lang || "en";
  ctx.i18n.locale(lan);

  const { tradingData } = ctx.session;
  const { currFrom, currTo } = tradingData;
  const tradePair = `${currFrom.ticker}_${currTo.ticker}`;
  const { minAmount } = await getMinimumDepositAmount(tradePair);

  ctx.session.tradingData = { ...tradingData, minAmount };
  const minAmountMsg = minAmount
    ? `${ctx.i18n.t("minimal")} - <b>${minAmount}</b>`
    : "";

  await safeReplyWithHTML(
    ctx,
    `${ctx.i18n.t(
      "enterAmountOf1"
    )} <b>${currFrom.ticker.toUpperCase()}</b> ${ctx.i18n.t(
      "enterAmountOf2"
    )}\n${minAmountMsg}`,
    keyboards.getAmountKeyboard(ctx.i18n)
  );
});

amount.on("text", async (ctx) => {
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

  if (text === ctx.i18n.t(buttons.back)) {
    ctx.session.tradingData = {
      ...tradingData,
      currTo: "",
    };

    delete ctx.session.tradingData.minAmount;

    await ctx.scene.enter(scenes.currTo);
    return;
  }
  if (text === ctx.i18n.t(buttons.help)) {
    await safeReply(ctx, `${ctx.i18n.t("support")}\n${process.env.CN_EMAIL}`);
    return;
  }

  const formattingAmount = Number(text.replace(",", "."));

  if (tradingData.minAmount > formattingAmount) {
    await safeReply(ctx, ctx.i18n.t("wrongAmount"));

    await pause(500);

    await ctx.scene.reenter();

    return;
  }

  if (!formattingAmount || text.match(/0x[\da-f]/i)) {
    await safeReply(ctx, ctx.i18n.t("numErr"));
    return;
  }

  ctx.session.tradingData = { ...tradingData, amount: formattingAmount };

  await ctx.scene.enter(scenes.estExch);
});

export default amount;
