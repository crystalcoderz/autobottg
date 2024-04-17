import Scene from "telegraf/scenes/base";
import scenes from "../constants/scenes";
import { keyboards } from "../keyboards";
import UserModel from "../models/User";
import { safeReply } from "../helpers";
import buttons from "../constants/buttons";

let lan = "en";

const read = new Scene(scenes.read);
read.enter(async (ctx) => {
  const user = await UserModel.findOne({ userId: ctx.from.id });
  lan = ctx.scene.state.lang || user?.lang || "en";
  ctx.i18n.locale(lan);
  await safeReply(
    ctx,
    ctx.i18n.t("startMsg"),
    keyboards.getMainKeyboard(ctx.i18n)
  );
});

read.on("text", async (ctx) => {
  ctx.i18n.locale(lan);

  const { text } = ctx.message;

  if (text === ctx.i18n.t(buttons.accept)) {
    const { message } = ctx;

    const { from } = message;
    const user = from;
    const { id: userId, username } = user;

    try {
      const userInDB = await UserModel.findOne({ userId: user.id });

      if (!userInDB) {
        await UserModel.create({ userId, username, lang: ctx.i18n.locale() });
      } else {
        await UserModel.findOneAndUpdate(
          { userId: user.id },
          { lang: ctx.i18n.locale() }
        );
      }
    } catch (e) {
      logger.error(`${__filename}: ${e}`);
    }

    ctx.session.userId = userId;

    await ctx.scene.enter(scenes.start);
  } else {
    ctx.scene.enter(scenes.read, { lang: lan });
  }
});

export default read;
