var request = require('hyperquest');
var Stream = require('stream').Stream;


function erroredStream(message) {
  var stream = new Stream;
  process.nextTick(function () {
    stream.emit('error', message);  
  });
  return stream;
}

module.exports = function (package) {
  if (!package) { 
    return erroredStream('Need a package name');
  }

  var url = 'http://registry.npmjs.org/-/_view/dependedUpon?group_level=2&startkey=%5B%22' 
     +package+ '%22%5D&endkey=%5B%22' +package+ 
     '%22%2C%7B%7D%5D&skip=0&limit=10000'

  return request(url)

}