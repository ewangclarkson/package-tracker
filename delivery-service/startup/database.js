const mongoose = require('mongoose');
const config = require('config');

const dbUrl = config.get('db.host') + ':'
    + config.get('db.port') + '/'
    + config.get('db.name');

main()
    .then(() => console.log(`You have successfully connected to ${dbUrl}`))
    .catch(() => new Error("Failed to connect to mongoDB"));

async function main() {
    return mongoose.connect(dbUrl);
}
module.exports.close = async function () {
    await mongoose.connection.close();
}
