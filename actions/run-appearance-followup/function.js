function(contextString, crop, result, details, ellipsis) {
  const Context = require('context');
const context = new Context(JSON.parse(contextString));
const newResult = Object.assign({}, result, { details: details });
context.acceptAppearanceResult(crop, newResult, ellipsis);
}
