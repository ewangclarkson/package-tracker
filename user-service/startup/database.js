const mongoose = require('mongoose');
const config = require('config');

const dbUrl = config.get('db.url');

module.exports.connect = async function main() {
    return mongoose.connect(dbUrl);
}
module.exports.disconnect = async function () {
    await mongoose.connection.close();
}
