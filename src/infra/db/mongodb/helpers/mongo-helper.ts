import { Collection, MongoClient } from 'mongodb';
import { mongoUri } from '../../../../../globalConfig.json';

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(uri: string = mongoUri): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(collection: string): Collection {
    return this.client.db().collection(collection);
  },
};
