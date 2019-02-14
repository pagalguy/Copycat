const test = require('ava');
const sinon = require('sinon');

const { TransformRecord } = require('../transform');
const { SavedRecords } = require('./testdata');

test(`TransformRecord - Tests the function that transforms src request & response to dest request & response objects`, t => {
  SavedRecords.forEach(record => {
    const response = TransformRecord(JSON.parse(record));
    t.true(response !== undefined);
  });
});
