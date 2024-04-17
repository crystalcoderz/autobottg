import Scene from "telegraf/scenes/base";
import { keyboards } from "../keyboards";
import { messages } from "../messages";
import buttons from "../constants/buttons";
import scenes from "../constants/scenes";
import { safeReply } from "../helpers";
import { app } from "../app";
import UserModel from "../models/User";

let lan = "en";

const addInfo = new Scene(scenes.addInfo);

addInfo.enter(async (ctx) => {
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user.lang || "en";
  ctx.i18n.locale(lan);
  const { tradingData } = ctx.session;
  const { currTo } = tradingData;
  const { hasExternalId, externalIdName } = currTo;

  if (hasExternalId) {
    await safeReply(
      ctx,
      `${ctx.i18n.t("addInfo")} ${externalIdName}`,
      keyboards.getExtraIDKeyboard(ctx.i18n)
    );
    ctx.session.tradingData = { ...tradingData, externalIdName };
  } else {
    await ctx.scene.enter(scenes.agree);
  }
});

addInfo.on("text", async (ctx) => {
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
    await ctx.scene.enter(scenes.estExch);
    return;
  }

  if (text === ctx.i18n.t(buttons.next)) {
    await ctx.scene.enter(scenes.agree);
    return;
  }

  if (text.match(/[^A-Za-z0-9\s]+/gi)) {
    await safeReply(ctx, ctx.i18n.t("validErr"));
    return;
  }

  ctx.session.tradingData = { ...tradingData, extraId: text };

  await ctx.scene.enter(scenes.agree);
});

export default addInfo;
