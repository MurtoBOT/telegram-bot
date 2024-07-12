import {
    MongoClient
} from "https://deno.land/x/mongo@LATEST_VERSION/mod.ts";
import IDatabaseCredentials from '../../abstract/db.credentials.interface.ts';
import DatabaseConnector from '../../abstract/db.connector.class.ts';

export default class MongoDbConnector extends DatabaseConnector {
    mongoClient: MongoClient;

    constructor()
    {
        super();
        this.mongoClient = new MongoClient();
    }

    async connect(credentials : IDatabaseCredentials) {
        if (credentials.remoteFlag)
        {
            await this.mongoClient.connect(
                `mongodb+srv://${credentials.username}:${credentials.password}@${credentials.host}/${credentials.basename}?authMechanism=SCRAM-SHA-1`,
            );
        } else {
            await this.mongoClient.connect(`mongodb://${credentials.host}:${credentials.port}`);
        }
    }
}