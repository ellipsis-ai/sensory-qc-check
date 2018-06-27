/*
@exportId EIxWiZUYSLuwjYMSfdFtBA
*/
module.exports = (function() {
const EllipsisApi = require('ellipsis-api');

return (ellipsis, result) => {
  return new Promise((resolve, reject) => {
    const api = new EllipsisApi(ellipsis).storage;

    const mutation = `
    mutation CreateCropRoomResult($cropRoomResult: CropRoomResultInput!) {
      createCropRoomResult(cropRoomResult: $cropRoomResult) {
        id
        crop
        room
        resultType
        result
        details
        pictureUrl
        harvestDate
        timestamp
      }
    }
    `;

    const vars = {
      cropRoomResult: result
    };

    console.log(ellipsis.apiBaseUrl);
    api.query({ query: mutation, variables: vars }).then(resolve);
  });
};

})()
     