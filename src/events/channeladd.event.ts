import { Bot } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { Event } from "../abstract/event.class.ts";
import { BotContext, env } from "../bot.ts";

export default class ChannelAddEvent extends Event {
    constructor(bot: Bot<BotContext>) {
        super(bot);
    }

    registerEvent(): void {
        this.bot.on("my_chat_member", (ctx) => {
            if (ctx.update.my_chat_member.new_chat_member.status != "kicked"
                && ctx.update.my_chat_member.new_chat_member.status == "administrator"
                && ctx.update.my_chat_member.chat.type == "channel"
            )
            {
                this.bot.api.sendMessage(ctx.update.my_chat_member.from.id, ctx.translate("channelinvite-welcome-msg", { bot_name: env["BOT_NAME"], channel_name: String(ctx.chat.title), suggest_link: "https://t.me/" + this.bot.botInfo.username + "?start=" + String(this.bot.botInfo.id) }), { parse_mode: 'HTML' });
            }
        });
    }
}