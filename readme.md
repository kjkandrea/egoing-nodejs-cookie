# Nodejs Authentication : Cookie

## 쿠키 란?

## 실습

### cookie.js

다음과 같이 cookie.js를 생성하고 Something 안에서 쿠키를 실습해볼 것이다.

``` javascript
// cookie.js

const http = require('http');

http.createServer((req, res) => {
  // Something
  res.end('Cookie!')
}).listen(3000)
```

### 쿠키 생성하기 (Create)

`writeHead()` 메소드로 쿠키를 생성하여보자

``` javascript
res.writeHead(200, {
  'Set-Cookie': [
    'yummy_cookie=choco',
    'testy_cookie=strawberry'
  ]
});
```

생성 후 Response Header 를 살펴보면 쿠키가 생성된 것을 볼 수 있다.

```
// Response Header

Set-Cookie: yummy_cookie=choco
Set-Cookie: testy_cookie=strawberry
```

Request Header 를 살펴보면 요청에 쿠키를 담고 있다.

```
// Request Header

Cookie: yummy_cookie=choco; testy_cookie=strawberry
```

* 크롬 Network/Cookies 탭에서도 생성된 쿠키를 확인할 수 있다.
* 크롬 Application/Cookies 탭에서도 생성된 쿠키를 확인할 수 있다.

### 쿠키 읽기 (Read)

위의 내용을 토대로 Request Headers 정보를 node.js에서 읽어들여보자

``` javascript
console.log(req.headers.cookie) // yummy_cookie=choco; testy_cookie=strawberry
```

`yummy_cookie=choco; testy_cookie=strawberry`로 단순 문자열 형태로 반환되기 때문에 이를 분석해줄 도구가 필요하다.

#### cookie

[cookie](https://www.npmjs.com/package/cookie)

```
npm install cookie --save
```

``` javascript
const cookie = require('cookie')

http.createServer((req, res) => {
  let cookies = {}
  if(req.headers.cookie !== undefined) {
    cookies = cookie.parse(req.headers.cookie)
  }
  console.log(cookies)

  ...
}).listen(3000)

// { yummy_cookie: 'choco', testy_cookie: 'strawberry' }
```

쿠키들이 키, 값 쌍의 객체로 반환된것을 볼 수 있다.