import config from "./config";
import { Client, Account, Databases, ID } from "appwrite";

const client = new Client();

client
    .setEndpoint(config.appwriteURL)
    .setProject(config.appwriteProjectId);

const account = new Account(client);

const database = new Databases(client);

const userId = ID.unique();

export { account, database, userId };