const { TransformExpressions } = require('./expressions');
const { transfom } = require('./config');

const TransformRecord = srcRecord => {
  const startedAt = new Date().getTime();

  const key = transfom.transfom_key_expression.evaluate(srcRecord);

  if (!TransformExpressions[key]) {
    // nothing to transform, return srcRecord as is
    return srcRecord;
  }

  const expression = TransformExpressions[key];

  if (!expression) {
    throw Error(`No handler found for ${path}`);
  }

  destRecord = expression.evaluate(srcRecord);

  console.log(
    `Tranformation took ${new Date().getTime() - startedAt} millisecs`
  );

  return destRecord;
};

module.exports = {
  TransformRecord
};
