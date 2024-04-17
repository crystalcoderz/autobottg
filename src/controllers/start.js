import Scene from "telegraf/scenes/base";
import scenes from "../constants/scenes";
import { keyboards } from "../keyboards";
import { safeReplyWithHTML, safeReply } from "../helpers";
import { app } from "../app";
import UserModel from "../models/User";
import { getTransactionStatus } from "../api";
import buttons from "../constants/buttons";

let lan = "en";

const start = new Scene(scenes.start);

start.enter(async (ctx) => {
  await app.analytics.trackStart(ctx);
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = user.lang || "en";
  ctx.i18n.locale(lan);

  const opts = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...keyboards.getStartEmptyKeyboard(ctx.i18n),
  };
  await safeReplyWithHTML(
    ctx,
    `${ctx.i18n.t("readPolicy")} <a href="${
      process.env.REDIRECT_URL
    }">${ctx.i18n.t("readPolicyLink")}</a>${ctx.i18n.t("readPolicy2")}`,
    opts
  );
});

start.on("text", async (ctx) => {
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user.lang || "en";
  ctx.i18n.locale(lan);

  const { text } = ctx.message;

  if (text !== undefined && text.startsWith("/status")) {
    var tranId = message.text.split("_")[1];
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

export default start;
