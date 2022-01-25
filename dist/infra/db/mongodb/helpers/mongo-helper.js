"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoHelper = void 0;
const mongodb_1 = require("mongodb");
exports.MongoHelper = {
    mongoClient: null,
    MongoDbUri: null,
    MongoMemoryUriToTests: null,
    async connect(uri) {
        this.mongoClient = await mongodb_1.MongoClient.connect(uri);
        if (!this.MongoDbUri)
            this.MongoDbUri = uri;
    },
    async disconnect() {
        await this.mongoClient.close();
        this.mongoClient = null;
    },
    async getCollection(collection) {
        var _a;
        if (!((_a = this.mongoClient) === null || _a === void 0 ? void 0 : _a.db)) {
            await this.connect(this.MongoDbUri);
        }
        return this.mongoClient.db().collection(collection);
    },
    map(collection) {
        const { _id, ...collectionWithOutId } = collection;
        return {
            id: _id,
            ...collectionWithOutId,
        };
    },
};
