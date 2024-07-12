import IDatabaseCredentials from './db.credentials.interface.ts';

export default abstract class DatabaseConnector {
    abstract connect(credentials : IDatabaseCredentials) : void;
}