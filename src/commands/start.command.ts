import { Bot, InlineKeyboard, Keyboard } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { Command } from "../abstract/command.class.ts";
import { BotContext, env } from "../bot.ts";

export default class StartCommand extends Command {
    constructor(bot: Bot<BotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("start", async (ctx) => {
            const welcomeKeyboard = new InlineKeyboard().url(ctx.translate("button-community"), env["BOT_COMMUNITY_LINK"]);
            
            await ctx.reply(ctx.translate("welcome-msg", {
                username: String(ctx.message?.from.first_name),
                bot_name: String(env["BOT_NAME"])
            }),
                { 
                    reply_markup: welcomeKeyboard,
                    parse_mode: 'HTML'
                }
            );

            const menuKeyboard = new Keyboard()
                .text(ctx.translate("button-profile"))
                .text(ctx.translate("button-channels")).row()
                .text(ctx.translate("button-suggest"))
                .resized();

            await ctx.reply(ctx.translate("menu-msg", {}), { reply_markup: menuKeyboard })
        });
    }
}