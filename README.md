# websign-client

A simple library to use websign in a fluent way

## Getting started
* npm install websign-client
* import in your html with srcipt tag like: `<script src="/lib/websign.js"></script>`
* or if you prefer, you can use in ecma6 way: `import WebSign from 'WebSign';`


## Example

```javascript
var webSign = new WebSign()
      
webSign.on('service-available', err => {
  //do your stuff...
});

webSign.on('service-unavailable', err => {
  //do your stuff...
});

webSign.sign("some text")

webSign.on('signed-data', data => {
  //do your stuff with data signed
});
```

## Run tests

* npm install
* npm run test

### Emulating a websign executable

* npm run dev


