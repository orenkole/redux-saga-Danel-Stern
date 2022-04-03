https://coursehunter.net/course/redux-saga

# 13. Setting up the application

https://github.com/danielstern/redux-saga-shopping-cart-server

`npm i && npm start`

frontedn app: https://github.com/danielstern/redux-saga-cart/tree/begin

# 14. Installing and configurening redux-saga

We can have several saga middleware in different parts of our application

# 15. Creating your first saga

Resume saga execution after delay

```
import {delay} from "redux-saga";
yield delay(1000);
```

# 18. What is yield?

Code meant to be run afte API call resolves must be placed inside callback.

Code outside callback runs out-of order
Wihout yield:

```
api.call(myURL, function callback(data)) {
	// code execution resumes here
}
// code outside callback runs before callback resolution
```

With yield:

```
let data = yield api.call(myURL);
// execution resumes here. No code run before promise resolution
```

```
var generator = function* (){return 5}
generator().next() // {value: 5, done: true}
```

```
var generator = function* () {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	return 5;
}

var obj = generator();
obj.next(); // {value: 1, done: false);
obj.next(); // {value: 2, done: false);
obj.next(); // {value: 3, done: false);
obj.next(); // {value: 4, done: false);
obj.next(); // {value: 5, done: true);
obj.next(); // {value: undefined, done: true);
```

Here first value returned by generator (promise) has to be resolved and only after that we'll get the next value

```
var delayGenerator = function* () {
	yield new Promise(r => setTimeout(r, 1000))
	return 42;
}

var obj = delayGenerator()
obj.next().value.then(v => {
	console.log(obj.next())
})
```
