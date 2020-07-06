const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Set-Cookie': [
      'yummy_cookie=choco',
      'testy_cookie=strawberry'
    ]
  });
  res.end('Cookie!')
}).listen(3000)