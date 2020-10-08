const UwUClient = require('./Structures/UwUClient');
const config = require('../config.json');

const client = new UwUClient(config);
client.login();
