import Scene from "telegraf/scenes/base";
import scenes from "../constants/scenes";
import { safeReplyWithHTML, safeReply } from "../helpers";
import { app } from "../app";
import UserModel from "../models/User";
import buttons from "../constants/buttons";
import { getTransactionStatus } from "../api";
let lan = "en";

const newEx = new Scene(scenes.newEx);

newEx.enter(async (ctx) => {
  await app.analytics.trackNew(ctx);
});

newEx.on("text", async (ctx) => {
  await app.analytics.trackNew(ctx);
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
    await ctx.scene.enter(scenes.currFrom, { lang: lan });
  } else if (text === ctx.i18n.t(buttons.help)) {
    await safeReply(ctx, `${ctx.i18n.t("support")}\n${process.env.CN_EMAIL}`);
  }
});

export default newEx;
