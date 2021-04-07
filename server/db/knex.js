const knex = require('knex');

const connectedKnex = knex({
  client: 'sqlite3',
  connection: {
    filename: './server/db/vending-machine.db',
  },
  useNullAsDefault: true,
});

module.exports = connectedKnex;
