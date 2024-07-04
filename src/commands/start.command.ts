import { Bot } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { Command } from "../abstract/command.class.ts";
import { BotContext } from "../bot.ts";

export default class StartCommand extends Command {
    constructor(bot: Bot<BotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("start", (ctx) => {
            ctx.reply(ctx.translate("welcome-msg"));
        });
    }
}