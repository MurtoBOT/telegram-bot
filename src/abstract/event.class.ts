import { Bot } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { BotContext } from "../bot.ts";

export abstract class Event {
    constructor(public bot: Bot<BotContext>) {}

    abstract registerEvent() : void;
}