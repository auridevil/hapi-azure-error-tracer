'use strict';

const azure = require('azure-storage');
const ASQ = require('asynquence-contrib');
const azureTableService = azure.createTableService();
const shortid = require('shortid');
const ERROR_TABLE = process.env.ERROR_TABLE || 'errors';

// https://azurestorageexplorer.codeplex.com/ to explore data

exports.register = (server, options, next) => {

  server.ext('onPostHandler', (request, reply) => {
    const response = request.response;

    if (response.isBoom) {
      let entGen = azure.TableUtilities.entityGenerator;
      let trace = {
        PartitionKey: entGen.String('exceptions'),
        RowKey: entGen.String(shortid.generate()),
        code: entGen.String(response.code),
        message: entGen.String(response.message),
        name: entGen.String(response.name),
        data: entGen.String(response.data),
        insert: entGen.DateTime(new Date())
      };
      ASQ((done) => {
        azureTableService.createTableIfNotExists(ERROR_TABLE, done.errfcb);
      }).then((done) => {
        azureTableService.insertEntity(ERROR_TABLE, trace, done.errfcb);
      }).then((done) => {
        done();
      }).or((err) => {
        console.log('error tracing error');
        console.error(err);
      });
    }

    return reply.continue();

  });

  next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};
