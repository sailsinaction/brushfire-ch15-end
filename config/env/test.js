module.exports = {
  models: {
    connection: 'memory',
    schema: true,
    migrations: 'drop'
  },
  connections: {
    memory: {
      adapter: 'sails-memory',
    }
  },
  session: {
    adapter: 'memory'
  },

  csrf: false,
};