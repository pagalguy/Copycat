const jsonata = require('jsonata');

const config = {
  recorder: {
    bucket_name: '{name of the bucket to store recorded values goes here}',
    file_name_tmpl: jsonata(
      `jsonata expression that will generate the filename for storing on GCS`
    )
  },
  transfom: {
    exp_key_tmpl: jsonata(
      `jsonata expression that will generate a key which will be used to lookup expressions`
    )
  },
  runner: {
    dest_base_url: '{Base URL path of the destination endpoints}'
  }
};

module.exports = {
  ...config
};
