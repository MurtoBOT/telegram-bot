import { Bot } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { Command } from "../abstract/command.class.ts";

export default class StartCommand extends Command {
    constructor(bot: Bot) {
        super(bot);
    }

    handle(): void {
        this.bot.command("start", (ctx) => {
            ctx.reply("Hello world");
        });
    }
}