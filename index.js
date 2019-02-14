const { RecordRequest } = require('./recorder');
const { TransformRecord } = require('./transform');
const { RunRequest } = require('./runner');

const CopycatStreamingPubSubHandler = async (pubsub, context, callback) => {
  // ... parse the pubsub payload to get the payload
  const payload = pubsub.data
    ? JSON.parse(Buffer.from(pubsub.data, 'base64').toString())
    : {};

  try {
    // first, save the request in GCS
    const { saved_at, saved_path } = await RecordRequest({
      ...payload
    });

    /* // second, apply the transformations to get the request that will be made
    // and expected response
    const {
      request: destRequest,
      response: expectedResponse
    } = TransformRecord(payload);

    // third, execute the transformed request
    const destResponse = await RunRequest({
      request: destRequest
    });

    // TODO finally, compare the expected response and actual response
    // and log pass/fail along with other outputs etc */

    return callback(null, { success: true });
  } catch (err) {
    console.error(err);
    return callback(err, null);
  }
};

module.exports = {
  CopycatStreamingPubSubHandler
};
