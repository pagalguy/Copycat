const test = require('ava');
const sinon = require('sinon');

const { CopycatStreamingPubSubHandler } = require('../index.js');

const { SavedRecords } = require('./testdata');

test(`CopycatStreamingPubSubHandler - Tests the Pub/Sub listener function`, async t => {
  for (let i = 0; i < SavedRecords.length; i++) {
    const record = SavedRecords[i];

    const callback = sinon.stub();
    const pubsub = {
      data: Buffer.from(record)
    };

    await CopycatStreamingPubSubHandler(pubsub, {}, callback);

    t.true(callback.calledOnce);
    t.falsy(callback.firstCall.args[0]);
    t.true(
      callback.firstCall.args[1] !== undefined &&
        callback.firstCall.args[1] !== null
    );
  }
});
