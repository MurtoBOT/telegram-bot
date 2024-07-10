import { Bot } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { Event } from "../abstract/event.class.ts";
import { BotContext, env } from "../bot.ts";

export default class ChatInviteEvent extends Event {
    constructor(bot: Bot<BotContext>) {
        super(bot);
    }

    registerEvent(): void {
        this.bot.on(":new_chat_members:me", (ctx) => {
            ctx.reply(ctx.translate("chatinvite-welcome-msg", { bot_name: env["BOT_NAME"], chat_name: String(ctx.chat.title) }), { parse_mode: 'HTML' });
        });
    }
}