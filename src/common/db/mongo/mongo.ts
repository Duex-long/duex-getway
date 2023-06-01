import { FactoryProvider } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';

const initClicent = async () => {
  const client = new MongoClient(process.env.MONGDO_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });

    return client;
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};

export const mongodbProvider: FactoryProvider<MongoClient> = {
  provide: 'MongoDB_Providers',
  useFactory: initClicent,
};
