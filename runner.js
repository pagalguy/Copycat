const superagent = require('superagent');

const RunRequest = record => {
  const startedAt = new Date().getTime();

  // excutes the request payload onto the new domain
  const { request, config } = record;

  const url = `${config.dest_base_url}${request.path}`;

  const headers = Object.assign({}, request.headers, {
    'x-repl-ip': request.ipaddress, // send the IP captured from request has additional header
    'x-repl-auth': config.repl_auth_token
  });

  return superagent(request.method, url)
    .set(headers)
    .query(request.params)
    .send(request.payload)
    .then(httpRes => {
      console.log(
        `Executing request took ${new Date().getTime() - startedAt} millisecs`
      );
      return {
        payload: httpRes.body,
        headers: httpRes.headers,
        status: httpRes.status
      };
    })
    .catch(err => {
      return {
        payload: err.response.body,
        headers: err.response.headers,
        status: err.status
      };
    });
};

module.exports = {
  RunRequest
};
