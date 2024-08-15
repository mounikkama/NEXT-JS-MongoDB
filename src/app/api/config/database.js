import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://mail3mounik:MjqmflImlWAVKDT8@cluster0.necae2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export { clientPromise };
