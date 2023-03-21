#!/usr/bin/node
const argv = process.argv;
const request = require('request');

function getPromise (url) {
  const promise = new Promise(function (resolve, reject) {
    request(url, function (err, res, body) {
      if (err) reject(err);
      else resolve(JSON.parse(body).name);
    });
  });
  return promise;
}

request(
  `https://swapi-api.hbtn.io/api/films/${argv[2]}`,
  async function (err, res, body) {
    if (err) throw err;
    const data = JSON.parse(body).characters;

    for (const i of data) {
      const result = await getPromise(i);
      console.log(result);
    }
  }
);
