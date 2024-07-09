import { Bot } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { BotContext } from "../../bot.ts";
import { Button } from "../../abstract/button.class.ts";
import { hears } from 'https://deno.land/x/grammy_i18n@v1.0.2/i18n.ts'

export default class ChannelsButton extends Button {
    constructor(bot: Bot<BotContext>) {
        super(bot);
    }

    handleClick(): void {
        this.bot.filter(hears<BotContext>("button-channels"), (ctx) => {
            ctx.reply("Channels message");
        });
    }
}