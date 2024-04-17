import Scene from "telegraf/scenes/base";
import scenes from "../constants/scenes";
import { keyboards } from "../keyboards";
import Extra from "telegraf/extra";

const language = new Scene(scenes.language);

let messageID;

language.enter((ctx) => {
  ctx.telegram
    .sendMessage(
      ctx.chat.id,
      ctx.i18n.t("language"),
      Extra.markdown().markup(keyboards.getLangKeyboard(ctx.i18n))
    )
    .then((message) => {
      messageID = message.message_id;
    });
});

language.action("/ru", async (ctx) => {
  ctx.deleteMessage(messageID);
  ctx.i18n.locale("ru");
  ctx.reply(ctx.i18n.t("selectedLang", { text: ctx.i18n.t("ru") }));

  ctx.scene.enter(scenes.read, { lang: "ru" });
});

language.action("/en", async (ctx) => {
  ctx.deleteMessage(messageID);
  ctx.i18n.locale("en");
  ctx.reply(ctx.i18n.t("selectedLang", { text: ctx.i18n.t("en") }));

  ctx.scene.enter(scenes.read, { lang: "en" });
});

export default language;
