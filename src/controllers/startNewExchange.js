import Scene from "telegraf/scenes/base";
import scenes from "../constants/scenes";
import { keyboards } from "../keyboards";
import { safeReply, safeReplyWithHTML } from "../helpers";
import { app } from "../app";
import UserModel from "../models/User";
import { getTransactionStatus } from "../api";
import buttons from "../constants/buttons";

let lan = "en";

const startNewExchange = new Scene(scenes.startNewExchange);

startNewExchange.enter(async (ctx) => {
  await app.analytics.trackWelcomeScreen(ctx);
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = user.lang || "en";
  ctx.i18n.locale(lan);

  await safeReply(
    ctx,
    ctx.i18n.t("cancel"),
    keyboards.getBackKeyboard(ctx.i18n)
  );
});

startNewExchange.on("text", async (ctx) => {
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user.lang || "en";
  ctx.i18n.locale(lan);

  const { text } = ctx.message;

  if (text !== undefined && text.startsWith("/status")) {
    var tranId = text.split("_")[1];
    const updatedTrn = await getTransactionStatus(tranId);
    if (updatedTrn) {
      await safeReplyWithHTML(
        ctx,
        `${ctx.i18n.t("status")} <b>${ctx.i18n.t(`t${updatedTrn.status}`)}</b>`
      );
    }
    return;
  }

  if (text === ctx.i18n.t(buttons.startNew)) {
    await ctx.scene.enter(scenes.currFrom);
    return;
  }
  if (text === ctx.i18n.t(buttons.help)) {
    await safeReply(ctx, `${ctx.i18n.t("support")}\n${process.env.CN_EMAIL}`);
    return;
  }
});

export default startNewExchange;
