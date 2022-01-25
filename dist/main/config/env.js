"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
    port: process.env.PORT || 4001,
    jwtSecret: process.env.JWT_SECRET || 'mvb-100==%!##',
};
