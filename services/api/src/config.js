const mongoHost = process.env.MONGO_HOST;

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

export const mongoDatabase = process.env.MONGO_DATABASE;

export const mongoPath = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}/admin`;

console.log("mongoDatabase", mongoDatabase);
