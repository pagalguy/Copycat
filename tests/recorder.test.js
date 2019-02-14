const test = require('ava');
const sinon = require('sinon');

const { RecordRequest } = require('../recorder');
const { SavedRecords } = require('./testdata');

test(`RecordRequest - Tests function saves the recorded payloads to GCS`, async t => {
  for (let i = 0; i < SavedRecords.length; i++) {
    const record = SavedRecords[i];

    const response = await RecordRequest(JSON.parse(record));

    t.true(response !== undefined);
    t.true(response.saved_at !== undefined);
  }
});
