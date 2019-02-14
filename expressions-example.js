const jsonata = require('jsonata');

const TransformExpressions = {
  '/api/messages': jsonata(`{
    "request" : {
      "path" : $join(["/v9/messages", request.payload.action = 'create' and request.payload.post.participant_id != null?'send_to_user':'send'],"/"),
      "payload" : {
        "id" : $number(response.payload.post.id),
        "conv_id" : $number(request.payload.post.group),
        "to_user_id" : $number(request.payload.post.participant_id),
        "client_id" : request.payload.post.client_id,
        "content" : request.payload.post.content,
        "embeds" : request.payload.post.embeds,
        "created_at" : $number(request.payload.post.created)
      },
      "headers" : {
        "content-type": request.headers.\`content-type\`,
        "user-agent": request.headers.\`user-agent\`,
        "cookie": request.headers.cookie,
        "origin": request.headers.origin,
        "referer": request.headers.referer
      },
      "method" : $uppercase(request.method)
    },
    "response" : {
      "headers" : {
        "content-type" : response.headers.\`content-type\`
      },
      "payload" : {
        "conversation" : {
          "id" : response.payload.group.id,
          "unqiue_hash" : response.payload.group.hash,
          "created_at" : response.payload.group.created
        },
        "message" : {
          "id" : response.payload.post.id,
          "content" : response.payload.post.content,
          "embeds" : response.payload.post.embeds,
          "created_at" : response.payload.post.created,
          "client_id" : response.payload.post.client_id
        }
      }
    }
  }`)
};

module.exports = {
  TransformExpressions
};
