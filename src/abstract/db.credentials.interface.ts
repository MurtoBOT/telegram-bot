export enum DatabaseProviders {
    mongoDb = "mongodb"
}

export default interface IDatabaseCredentials {
    host: string;
    username: string;
    password: string;
    basename: string;
    port: string;

    remoteFlag: boolean;
}