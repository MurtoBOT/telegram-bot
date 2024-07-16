import { Bot, Context, GrammyError, HttpError } from "https://deno.land/x/grammy@v1.26.0/mod.ts";
import { I18n, I18nFlavor } from "https://deno.land/x/grammy_i18n@v1.0.2/mod.ts";
import { Command } from "./abstract/command.class.ts";
import { Button } from "./abstract/button.class.ts";
import { Event } from "./abstract/event.class.ts";

import DatabaseConnector from './abstract/db.connector.class.ts';
import IDatabaseCredentials, { DatabaseProviders } from './abstract/db.credentials.interface.ts';
import MongoDbConnector from './database/mongodb/mongodb.connector.ts';

import StartCommand from "./commands/start.command.ts";

import ProfileButton from "./buttons/menu/profile.button.ts";
import ChannelButton from "./buttons/menu/channel.button.ts";
import SuggestButton from "./buttons/menu/suggest.button.ts";

import ChatInviteEvent from "./events/chatinvite.event.ts";
import ChannelAddEvent from './events/channeladd.event.ts';

import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

export const env = await load();

export type BotContext = Context & I18nFlavor;

const i18n = new I18n<BotContext>({
    defaultLocale: "en",
    directory: "locales"
});

class TGBot {
    
    bot: Bot<BotContext>;
    commands: Command[] = [];
    events: Event[] = [];
    buttons: Button[] = [];

    databaseWrapper: DatabaseConnector;

    constructor(botToken : string) {
        this.bot = new Bot<BotContext>(botToken);
        this.bot.use(i18n);
    }

    connectDatabase(provider : DatabaseProviders, credentials : IDatabaseCredentials) : void {
        switch (provider)
        {
            case DatabaseProviders.mongoDb: {
                this.databaseWrapper = new MongoDbConnector();
                this.databaseWrapper.connect(credentials);
                break;
            }
        }
    }

    init() : void
    {
        this.commands = [
            new StartCommand(this.bot)
        ];
        for (const command of this.commands) {
            command.handle();
        }

        this.buttons = [
            new ProfileButton(this.bot), 
            new ChannelButton(this.bot),
            new SuggestButton(this.bot)
        ];
        for (const button of this.buttons)
        {
            button.handleClick();
        }

        this.events = [
            new ChatInviteEvent(this.bot),
            new ChannelAddEvent(this.bot)
        ];
        for (const event of this.events)
        {
            event.registerEvent();
        }

        this.bot.catch((err) => {
            const ctx = err.ctx;
            console.error(`Error while handling update ${ctx.update.update_id}:`);
            const e = err.error;
            if (e instanceof GrammyError) {
              console.error("Error in request:", e.description);
            } else if (e instanceof HttpError) {
              console.error("Could not contact Telegram:", e);
            } else {
              console.error("Unknown error:", e);
            }
        });

        this.bot.start();
    }
}

const bot = new TGBot(env["TG_TOKEN"]);

bot.connectDatabase(
    DatabaseProviders[env["DB_PROVIDER"] as keyof typeof DatabaseProviders],
    {
        host: env["DB_HOST"],
        username: env["DB_USERNAME"],
        password: env["DB_PASSWORD"],
        basename: env["DB_NAME"],
        port: env["DB_PORT"],

        remoteFlag: Boolean(env["DB_REMOTE"])
    } as IDatabaseCredentials
);
bot.init();