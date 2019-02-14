const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');

const { recorder } = require('./config');

// Creates a client
const storage = new Storage();

const RecordRequest = async record => {
  // saves recorded request into a file on Google Cloud
  // file name is generated based on the json expression from config

  const filename = recorder.filename_expression.evaluate(record);

  return new Promise((resolve, reject) => {
    const gcsFile = storage
      .bucket(recorder.bucket_name)
      .file(filename)
      .createWriteStream({
        contentType: 'application/json'
      });

    gcsFile.end(JSON.stringify(record, null, 2));
    gcsFile.on('finish', () =>
      resolve(
        Object.assign({}, record, {
          saved_at: new Date().getTime(),
          saved_path: filename,
          saved_bucket: recorder.bucket_name
        })
      )
    );
    gcsFile.on('error', err => reject(err));
  });
};

module.exports = {
  RecordRequest
};
