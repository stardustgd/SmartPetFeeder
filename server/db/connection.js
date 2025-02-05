<<<<<<< HEAD
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const URI = process.env.ATLAS_URI || "";
=======
import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const URI = process.env.ATLAS_URI || ''
>>>>>>> 750f6a12c497ee8ea4b778df8c90c6e81a48bb00
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
<<<<<<< HEAD
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db("UserinfoSPF");

export default db;
=======
})

try {
  await client.connect()
  await client.db('admin').command({ ping: 1 })
  console.log('Pinged your deployment. You successfully connected to MongoDB!')
} catch (err) {
  console.error(err)
}

let db = client.db('UserinfoSPF')

export default db
>>>>>>> 750f6a12c497ee8ea4b778df8c90c6e81a48bb00
