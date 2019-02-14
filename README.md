# Copycat

Copycat is a service that can save, replay & test HTTP requests across different stacks, versions of API endpoints. You can use Copycat to do integration and load testing when you are migrating an API across stacks or transitioning to a new API version.

## Tools

The core functions are implemented as utilities, so that you can plug them into any server/framework you are using.

But, for first version, I will be using:
- Google Pub/Sub - as a queue to recieve events for recording
- Cloud Functions - to transform, execute & check
- Cloud Storage - to save recorded events
- Firebase Realtime DB - to output test results & aggregate data. I am choosing this because it's easy to view the data from Firebase Console. Firebase also make it easy to write UI components to see stats.

## Development

To run this project, you have to setup these files:
- `config.js` : Contains configurations for recording, transformatting & running requests
- `expressions.js` : Contains jsonata expressions for transformation request & response objects
- `tests/testdata.js` : Contains test data to run tests in your machine.

## DX

The goal of this service is to make it uber simple for developers to record, transform and replay HTTP requests.

*These are just notes for my implementation:*
- *Save HTTP request as a JSON object*
- *Publish this JSON to a queue*
- *Save the JSON as a file (to replay later)*
- *Execute transformations on*
  - *Request path*
  - *Request query params*
  - *Request payload*
  - *Request headers*
- *Execute the new request on the destination domain*
- *Run checks on src/src+transformations vs dest responses*
  - *response payload*
  - *response headers*
- *Log check output a log file/db*
