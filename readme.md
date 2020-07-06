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

### 쿠키 생성하기

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

크롬 Application/Cookies 탭에서도 생성된 쿠키를 확인할 수 있다.

