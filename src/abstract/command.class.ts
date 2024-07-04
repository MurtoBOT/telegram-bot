import { Bot } from "https://deno.land/x/grammy@v1.26.0/mod.ts";

export abstract class Command {
    constructor(public bot: Bot) {}

    abstract handle(): void;
}