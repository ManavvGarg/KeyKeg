const { MongoClient, ServerApiVersion } = require("mongodb");
const usr = encodeURIComponent(process.env.MONGODB_USR);
const pwd = encodeURIComponent(process.env.MONGODB_PWD);

const client = new MongoClient(
  `mongodb+srv://${usr}:${pwd}@keykegc1.zlxibhf.mongodb.net/?retryWrites=true&w=majority&appName=KeyKegC1`,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

async function connectDatabase() {
  try {
    await client.connect();
    await client.db(process.env.MONGO_DB).command({ ping: 1 });
    console.log("Connected to MongoDB");
    return { clientConnection: client, flag: true };
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

async function disconnectDatabase(client) {
  try {
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Failed to disconnect from MongoDB", error).then(() => {
      return false;
    });
    throw error;
  }
}

export { connectDatabase, disconnectDatabase };
