import { Bot, Context, GrammyError, HttpError } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { I18n, I18nFlavor } from "https://deno.land/x/grammy_i18n@v1.0.2/mod.ts";
import { Command } from "./abstract/command.class.ts";
import StartCommand from "./commands/start.command.ts";

import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
export const env = await load();

export type BotContext = Context & I18nFlavor;

const i18n = new I18n<BotContext>({
    defaultLocale: "en",
    directory: "locales"
});

class TGBot {
    
    bot: Bot<BotContext>;
    commands: Command[] = [];

    constructor(botToken : string) {
        this.bot = new Bot<BotContext>(botToken);
        this.bot.use(i18n);
    }

    init()
    {
        this.commands = [new StartCommand(this.bot)];
        for (const command of this.commands) {
            command.handle();
        }

        this.bot.catch((err) => {
            const ctx = err.ctx;
            console.error(`Error while handling update ${ctx.update.update_id}:`);
            const e = err.error;
            if (e instanceof GrammyError) {
              console.error("Error in request:", e.description);
            } else if (e instanceof HttpError) {
              console.error("Could not contact Telegram:", e);
            } else {
              console.error("Unknown error:", e);
            }
        });
        
        this.bot.start();
    }
}

const bot = new TGBot(env["TG_TOKEN"]);
bot.init();