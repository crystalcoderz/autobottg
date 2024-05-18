import Telegraf from "telegraf";
import rp from "request-promise";
import RedisSession from "telegraf-session-redis";
import Stage from "telegraf/stage";
import start from "./controllers/start";
import currFrom from "./controllers/currFrom";
import curTo from "./controllers/curTo";
import amount from "./controllers/amount";
import addInfo from "./controllers/addInfo";
import estimateExchange from "./controllers/estimateExchange";
import checkAgree from "./controllers/checkAgree";
import read from "./controllers/read";
import language from "./controllers/language";
import newEx from "./controllers/newExchange";
import startNewExchange from "./controllers/startNewExchange";
import scenes from "./constants/scenes";
import { pause } from "./helpers";
import updateTypes from "./constants/updateTypes";
import { getTransactionStatus } from "./api";
import { safeReply, safeReplyWithHTML } from "./helpers";
import lang from "./translation/config";
import UserModel from "./models/User";
import subTypes from "./constants/updateSubTypes";
import { getRandom } from "./helpers";
import buttons from "./constants/buttons";

let lan = "en";

export const bot = new Telegraf(process.env.API_BOT_KEY);

export const stage = new Stage([
  start,
  currFrom,
  curTo,
  newEx,
  language,
  amount,
  addInfo,
  estimateExchange,
  checkAgree,
  read,
  startNewExchange,
]);

export const session = new RedisSession({
  store: {
    host: process.env.DB_REDIS_HOST || "127.0.0.1",
    port: process.env.DB_REDIS_PORT || 6379,
  },
});

stage.command("start", async (ctx, next) => {
  await ctx.scene.leave();
  return next();
});

bot.use(lang.middleware());
bot.use(session);
bot.use(stage.middleware());

bot.start(async (ctx) => {
  if (ctx.session) {
    ctx.session = null;
  }
  await ctx.scene.enter(scenes.language);
});

bot.on(updateTypes.message, async (ctx, next) => {
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = user.lang || "en";
  ctx.i18n.locale(lan);

  const { text } = ctx.message;
  try {
    const { session, updateSubTypes, scene } = ctx;

    if (text !== undefined && text.startsWith("/status")) {
      var tranId = text.split("_")[1];
      const updatedTrn = await getTransactionStatus(tranId);
      if (updatedTrn) {
        await safeReplyWithHTML(
          ctx,
          `${ctx.i18n.t("status")} <b>${ctx.i18n.t(
            `t${updatedTrn.status}`
          )}</b>`
        );
        return;
      }
      return;
    }

    if ((!session || !session.userId) && !scene.current) {
      await safeReply(ctx, ctx.i18n.t("replyForCrash"));
      await ctx.scene.leave();
      ctx.session = null;
      await pause(500);
      await ctx.scene.enter(scenes.language);
      return;
    }
    if (text === ctx.i18n.t(buttons.startNew)) {
      await ctx.scene.enter(scenes.currFrom);
      return;
    }
    const promises = updateSubTypes.map(async (type) => {
      let textMessage;
      switch (type) {
        case subTypes.photo:
          textMessage = ctx.i18n.t(`answersByPhoto${getRandom(1, 7)}`);
          if (textMessage) {
            await safeReply(ctx, textMessage);
            await pause(500);
            return;
          }
        case subTypes[type]:
          textMessage = ctx.i18n.t(`randomText${getRandom(1, 2)}`);
          if (textMessage) {
            await safeReply(ctx, textMessage);
            await pause(500);
            return;
          }
        default:
          return;
      }
    });
    await Promise.all(promises);

    return next();
  } catch (error) {
    await ctx.scene.leave();
    console.log(error);
    return;
  }
});

export async function initBot() {
  console.log("bot init ");

  if (process.env.NODE_ENV === "development") {
    rp(
      `https://api.telegram.org/bot${process.env.API_BOT_KEY}/deleteWebhook`
    ).then(() => bot.startPolling());
  } else if (
    process.env.NODE_ENV !== "development" &&
    process.env.APP_USE_CERTIFICATE == "true"
  ) {
    bot.telegram.setWebhook(
      `${process.env.APP_HOST}/${process.env.WEBHOOK_PART}/${process.env.API_BOT_KEY}`,
      { source: process.env.SSL_CERTIFICATE_PATH }
    );

    bot.startWebhook(
      `${process.env.WEBHOOK_PART}/${process.env.API_BOT_KEY}`,
      null,
      process.env.WEBHOOK_PORT
    );
    bot.launch();
  } else if (
    process.env.NODE_ENV !== "development" &&
    process.env.APP_USE_CERTIFICATE == "false"
  ) {
    bot.telegram.setWebhook(
      `${process.env.APP_HOST}/${process.env.WEBHOOK_PART}/${process.env.API_BOT_KEY}`
    );
    bot.startWebhook(
      `${process.env.WEBHOOK_PART}/${process.env.API_BOT_KEY}`,
      null,
      process.env.WEBHOOK_PORT
    );
    bot.launch();
  }
}
