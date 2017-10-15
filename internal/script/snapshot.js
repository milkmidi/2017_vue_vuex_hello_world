/* eslint no-console: 0 */
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const f = 1;
nightmare
  .goto('http://localhost:3000')
  .viewport(990, 640)
  .screenshot('snapshot.png')
  .end()
  .catch(function (error) {
    console.error(error)
  });