import { Bot } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { Command } from "./abstract/command.class.ts";
import * as BotCommand from "./commands";

class TGBot {
    bot: Bot;
    commands: Command[] = [];

    constructor(botToken : string) {
        this.bot = new Bot(botToken);
    }

    init()
    {
        this.commands = [new BotCommand.StartCommand(this.bot)];
        for (const command of this.commands) {
            command.handle();
        }
        
        this.bot.start();
    }
}

const bot = new TGBot(String(Deno.env.get("BOT_TOKEN")));
bot.init();