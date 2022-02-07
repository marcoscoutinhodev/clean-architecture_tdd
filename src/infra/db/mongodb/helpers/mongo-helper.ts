import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  mongoClient: null as unknown as MongoClient | null,
  MongoDbUri: null as unknown as string,
  MongoMemoryUriToTests: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.mongoClient = await MongoClient.connect(uri);
    if (!this.MongoDbUri) this.MongoDbUri = uri;
  },

  async disconnect(): Promise<void> {
    await this.mongoClient!.close();
    this.mongoClient = null;
  },

  async getCollection(collection: string): Promise<Collection> {
    if (!this.mongoClient?.db) { await this.connect(this.MongoDbUri); }

    return this.mongoClient!.db().collection(collection);
  },

  map(collection: any): any {
    const { _id, ...collectionWithOutId } = collection;

    return {
      id: _id,
      ...collectionWithOutId,
    };
  },

  mapCollection(collection: any[]): any[] {
    return collection.map((c) => MongoHelper.map(c));
  },
};
