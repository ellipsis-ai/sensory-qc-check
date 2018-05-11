function(contextString, crop, result, details, picture, ellipsis) {
  const box = require('ellipsis-box');
const Context = require('context');
const context = new Context(JSON.parse(contextString));

withMaybePictureUrl().then(maybeUrl => {
  const newResult = Object.assign({}, result, { details: details, pictureUrl: maybeUrl });
  context.acceptAppearanceResult(crop, newResult, ellipsis);
});

function withMaybePictureUrl() {
  return new Promise((resolve, reject) => {
    if (picture) {
      picture.fetch().then(res => {
        box.files(ellipsis).uploadWithTimestamp(res.filename, res.contentType, res.value).then(res => {
          resolve(res.url);
        });
      });
    } else {
      resolve(undefined);
    }
  });
}
}
