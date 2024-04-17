import Scene from "telegraf/scenes/base";
import { keyboards } from "../keyboards";
import { getIpFromDB, addTransactionToDB, pause } from "../helpers";
import { getExchAmount, sendTransactionData } from "../api";
import buttons from "../constants/buttons";
import scenes from "../constants/scenes";
import { safeReply, safeReplyWithHTML } from "../helpers";
import { app } from "../app";
import UserModel from "../models/User";

let lan = "en";

const checkAgree = new Scene(scenes.agree);

checkAgree.enter(async (ctx) => {
  await app.analytics.trackCheckAgree(ctx);
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user.lang || "en";
  ctx.i18n.locale(lan);
  const { tradingData } = ctx.session;
  const { currFrom, currTo, walletCode, extraId, externalIdName, amount } =
    tradingData;
  const { ticker: currFromTicker } = currFrom;
  const { ticker: currToTicker } = currTo;
  const extraIdMsg =
    extraId && externalIdName
      ? `${ctx.i18n.t("extra1")} ${externalIdName} ${ctx.i18n.t(
          "extra2"
        )} \n<b>${extraId}</b>.\n`
      : "";

  const fromTo = `${currFromTicker}_${currToTicker}`;
  const { estimatedAmount } = await getExchAmount(amount, fromTo);
  if (typeof estimatedAmount !== "number") {
    await safeReplyWithHTML(ctx, "sorry we catched some error");
    delete ctx.session.tradingData.amount;
    await ctx.scene.enter(scenes.amount);
    return;
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
      "agree1"
    )} <b>${currToTicker.toUpperCase()}</b> ${ctx.i18n.t(
      "agree2"
    )} <b>${walletCode}</b>\n${extraIdMsg}\n${ctx.i18n.t("agree3")} `,
    keyboards.getAgreeKeyboard(ctx.i18n)
  );
});

checkAgree.on("text", async (ctx) => {
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user.lang || "en";
  ctx.i18n.locale(lan);

  const { text } = ctx.message;

  if (text === ctx.i18n.t(buttons.back)) {
    if (ctx.session.tradingData.extraId) {
      delete ctx.session.tradingData.extraId;
    }

    if (ctx.session.tradingData.externalIdName) {
      delete ctx.session.tradingData.externalIdName;
    }

    await ctx.scene.enter(scenes.estExch);
    return;
  }

  if (text === ctx.i18n.t(buttons.help)) {
    await safeReply(ctx, `${ctx.i18n.t("support")}\n${process.env.CN_EMAIL}`);
    return;
  }

  if (text === ctx.i18n.t(buttons.confirm)) {
    const { userId, tradingData } = ctx.session;
    const { currFrom, currTo, walletCode, amount, extraId = "" } = tradingData;
    const ip = await getIpFromDB(userId);

    const data = {
      userId,
      amount,
      extraId,
      ip,
      from: currFrom.ticker,
      to: currTo.ticker,
      address: walletCode,
    };

    const res = await sendTransactionData(data);

    if (res && res.payinAddress) {
      const { transactionExplorerMask } = currTo;
      await addTransactionToDB(res, userId, transactionExplorerMask);

      await safeReplyWithHTML(
        ctx,
        `${ctx.i18n.t(
          "estimate2"
        )} <b>${amount} ${currFrom.ticker.toUpperCase()}</b>; ${ctx.i18n.t(
          "estimate3"
        )} ~<b>${res.amount} ${currTo.ticker.toUpperCase()}</b>.${ctx.i18n.t(
          "deposit"
        )}`,
        keyboards.getBackKeyboard(ctx.i18n)
      );

      await pause(500);

      await safeReply(ctx, `${res.payinAddress}`);
      if (res.payinExtraId) {
        await safeReplyWithHTML(ctx, `${res.payinExtraIdName} : \n`);
        await safeReplyWithHTML(ctx, `<b>${res.payinExtraId}</b>`);
      }

      await pause(1000);
      await app.analytics.trackTranCreate(ctx);
      await safeReplyWithHTML(ctx, `${ctx.i18n.t("txId")} - <b>${res.id}</b>.`);
      await safeReplyWithHTML(
        ctx,
        `${ctx.i18n.t("txClick")}:\n/status_${res.id}`
      );
      await safeReply(ctx, ctx.i18n.t("waiting"));
      ctx.scene.enter(scenes.newEx);

      return;
    }

    await safeReply(ctx, `${ctx.i18n.t("addrInvalid")}`);
    await ctx.scene.enter(scenes.estExch);
  }
});

export default checkAgree;
