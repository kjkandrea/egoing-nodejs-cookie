const http = require('http')
const cookie = require('cookie')

http.createServer((req, res) => {
  let cookies = {}
  if(req.headers.cookie !== undefined) {
    cookies = cookie.parse(req.headers.cookie)
  }
  console.log(cookies)

  res.writeHead(200, {
    'Set-Cookie': [
      `yummy_cookie=choco;  Max-Age=${60*60*24*30}`,
      'testy_cookie=strawberry; Secure',
      'doggys_cookie=meat; HttpOnly',
      'voice_actor_cookie=haebogoyang; Path=/cookie',
      'youtuber_cookie=haebogoyang; Domain=wireframe.kr'
    ]
  });
  res.end('Cookie!')
}).listen(3000)