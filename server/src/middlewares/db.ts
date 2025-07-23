import { Db, MongoClient, ServerApiVersion } from 'mongodb'
import Config from '../config/config'

const URI = Config.atlasUri

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

let db: Db

async function connectMongo(): Promise<Db> {
  if (!db) {
    await client.connect()

    db = client.db('SmartPetFeeder')
    console.log('MongoDB connection successful')
  }

  return db
}

export default connectMongo
