import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const options = {};

// Extend the global type
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Prevent multiple instances in dev
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
// eslint-disable-next-line prefer-const
clientPromise = global._mongoClientPromise;

export default clientPromise;