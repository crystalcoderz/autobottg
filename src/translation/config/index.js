import TelegrafI18n from "telegraf-i18n";
import { Language } from "../lang";
import path from "path";

export default new TelegrafI18n({
  defaultLanguage: Language.English,
  useSession: true,
  sessionName: "session",
  allowMissing: false,
  defaultLanguageOnMissing: Language.English,
  directory: path.resolve(__dirname, "../assets/locales"),
});
