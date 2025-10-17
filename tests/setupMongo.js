const mongoose = require('mongoose');

module.exports = {
    connect: async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/wmsb_test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    },
    clearDatabase: async () => {
        const collections = Object.values(mongoose.connection.collections);
        for (const collection of collections) {
            await collection.deleteMany();
        }
    },
    closeDatabase: async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    },
};