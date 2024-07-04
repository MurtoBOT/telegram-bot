import { Bot } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { Command } from "./abstract/command.class.ts";
import StartCommand from "./commands/start.command.ts";

import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
const env = await load();

class TGBot {
    bot: Bot;
    commands: Command[] = [];

    constructor(botToken : string) {
        this.bot = new Bot(botToken);
    }

    init()
    {
        this.commands = [new StartCommand(this.bot)];
        for (const command of this.commands) {
            command.handle();
        }
        
        this.bot.start();
    }
}

const bot = new TGBot(env["BOT_TOKEN"]);
bot.init();