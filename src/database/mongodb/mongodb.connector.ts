import {
    MongoClient
} from "https://deno.land/x/mongo@LATEST_VERSION/mod.ts";
import { env } from '../../bot.ts'

export const mongoClient = new MongoClient();

if (env["DB_REMOTE"])
{
    await mongoClient.connect(
      `mongodb+srv://${env["DB_USERNAME"]}:${env["DB_PASSWORD"]}@${env["DB_HOST"]}/${env["DB_NAME"]}?authMechanism=SCRAM-SHA-1`,
    );
} else {
    await mongoClient.connect(`mongodb://${env["DB_HOST"]}:27017`);
}

