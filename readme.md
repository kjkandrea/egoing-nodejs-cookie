# Nodejs Authentication : Cookie

## 쿠키 란?

[MDN : HTTP 쿠키](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)

### 세션 쿠키 (Session cookies)

### 영속적인 쿠키 (Permanent cookies)

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

### 쿠키의 수명 부여 (Max-Age)

쿠키를 생성할때 초코 쿠키(`yummy_cookie=choco`)의 유통기한을 30일로 설정해보겠다. 유통기한이 지난 쿠키는 사라진다.

``` javascript
res.writeHead(200, {
  'Set-Cookie': [
    `yummy_cookie=choco;  Max-Age=${60*60*24*30}`,
    'testy_cookie=strawberry'
  ]
});
```

초코 쿠키를 생성한 후 브라우저에서 해당 쿠키의 정보를 확인해보면 만료날짜(Expires)가 생긴것을 볼 수 있다.

![cookie](https://user-images.githubusercontent.com/32591477/86558331-09e09680-bf94-11ea-9b3c-fa2235c3f397.png)

### 쿠키 보안 옵션 (Secure, HttpOnly)

Secure 옵션을 주면 해당 쿠키는 HTTPS 프로토콜 상에서 암호화된(encrypted) 요청일 경우에만 전송된다.

> Secure일지라도 민감한 정보는 절대 쿠키에 저장되면 안됩니다, 본질적으로 안전하지 않고 이 플래그가 당신에게 실질적인 보안(real protection)를 제공하지 않기 때문입니다. 크롬52 혹은 파이어폭스52로 시작한다면, 안전하지 않은 사이트(http:) 는 쿠키에 Secure 설정을 지시할 수 없습니다. - MDN

``` javascript
res.writeHead(200, {
  'Set-Cookie': [
    `yummy_cookie=choco;`,
    'testy_cookie=strawberry; Secure'
  ]
});
```

HttpOnly 옵션을 주면 해당 쿠키는 서버에게 전송되기만 한다. HttpOnly 쿠키는 JavaScript에서 `document.cookie` 로 접근할 수 없다.

``` javascript
res.writeHead(200, {
  'Set-Cookie': [
    `yummy_cookie=choco;  Max-Age=${60*60*24*30}`,
    'testy_cookie=strawberry; Secure',
    'doggys_cookie=meat; HttpOnly'
  ]
});
```

![httponly-cookie](https://user-images.githubusercontent.com/32591477/86559359-b459b900-bf96-11ea-9fe8-54e91dbfc7d8.png)