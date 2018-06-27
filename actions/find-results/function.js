function(ellipsis) {
  const findResults = require('find-results');

findResults(ellipsis).then(res => {
  ellipsis.success(JSON.stringify(res));
});
}
