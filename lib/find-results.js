/*
@exportId fEjDc6phQjyeRwBIKQz65Q
*/
module.exports = (function() {
const EllipsisApi = require('ellipsis-api');

return (ellipsis) => {
  return new Promise((resolve, reject) => {
    const api = new EllipsisApi(ellipsis).storage;

    const query = `
    {
      cropRoomResultList(filter: { }) {
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

    api.query({query: query}).then(response => resolve(response.data.cropRoomResultList));
  });

}

})()
     