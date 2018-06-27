const jsonBody = require("body/json");
const scores = [{ name: "Edwin", score: 50 }, { name: "David", score: 39 }];
let highScores = scores
const textBody = require("body");

const http = require('http');
const resources = {
  "/scores": `scores`
}

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (resources[req.url] === undefined) {
      res.statusCode = 404;
      res.end("ERROR NOT FOUND");
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      const responseBody = resources[req.url];

      highScores = scores.slice(0, 3)
      res.end(JSON.stringify(highScores));
    }
  } else if (req.method === "PUT") {
    jsonBody(req, res, function (err, body) {
      scores.push(body)
      scores.sort(sortNumber)
      highScores = scores.slice(0, 3)
      const responseBody = resources[req.url];
      res.end(JSON.stringify(highScores))
    })
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function sortNumber(a, b) {
  return b.score - a.score;
}


