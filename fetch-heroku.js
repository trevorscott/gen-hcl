var Episode7 = require('episode-7');
const rp = require('request-promise');

function* fetchHeroku(url, herokuAuthToken) {
  var options = {
    url: `https://api.heroku.com/${url}`,
    method: 'GET',
      headers: {
        'Authorization': ` Bearer ${herokuAuthToken}`,
        'Accept': ' application/vnd.heroku+json; version=3'
      }
  }

  let appInfo = yield Episode7.call((options) => {
    return rp(options)
      .then((body) => {
        var newBody = JSON.parse(body)
        // console.log(newBody)
        return newBody
      })
      .catch(error => {
        throw new Error(error)
      })
  },options)
  return appInfo
}

module.exports = fetchHeroku;
