import { Bot, InlineKeyboard, Keyboard } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { ChatFullInfo } from "https://deno.land/x/grammy_types@v3.11.0/manage.ts";
import { Command } from "../abstract/command.class.ts";
import { BotContext, env } from "../bot.ts";

export default class StartCommand extends Command {
    constructor(bot: Bot<BotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("start", async (ctx) => {
            const welcomeKeyboard : InlineKeyboard = new InlineKeyboard().url(ctx.translate("button-community"), env["BOT_COMMUNITY_LINK"]);
            
            await ctx.reply(ctx.translate("welcome-msg", {
                username: String(ctx.message?.from.first_name),
                bot_name: String(env["BOT_NAME"])
            }),
                { 
                    reply_markup: welcomeKeyboard,
                    parse_mode: 'HTML'
                }
            );

            const menuKeyboard : Keyboard = new Keyboard()
                .text(ctx.translate("button-profile"))
                .text(ctx.translate("button-channels")).row()
                .text(ctx.translate("button-suggest"))
                .resized();

            let successLinkFlag : boolean = false;

            const argument : string = ctx.match;
            const channelId : number = Number(argument.replace("tgch_", ""));

            const botInfo = await this.bot.api.getMe();

            /* Some shit happens here, need to fix it in the future */
            let chatInfo : ChatFullInfo;
            try {
                chatInfo = await this.bot.api.getChat(channelId);
            } catch {
                await ctx.reply(ctx.translate("link-msg-error", { bot_name: env["BOT_NAME"] }), { parse_mode: 'HTML' });
                return;
            }
            
            const channelAdminList = await this.bot.api.getChatAdministrators(channelId);
            channelAdminList.forEach((admin) => {
                if (admin.user.id == botInfo.id) {
                    successLinkFlag = true;
                    return;
                }
            });

            if (successLinkFlag)
            {
                await ctx.reply(ctx.translate("link-msg-success", { channel_name: String(chatInfo.title) }), { parse_mode: 'HTML' });
            } else {
                await ctx.reply(ctx.translate("link-msg-error", { bot_name: env["BOT_NAME"] }), { parse_mode: 'HTML' });
            }

            await ctx.reply(ctx.translate("menu-msg", {}), { reply_markup: menuKeyboard });
        });
    }
}