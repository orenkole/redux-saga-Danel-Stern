https://coursehunter.net/course/redux-saga

# Introduction

## 13. Setting up the application

https://github.com/danielstern/redux-saga-shopping-cart-server

`npm i && npm start`

frontedn app: https://github.com/danielstern/redux-saga-cart/tree/begin

## 14. Installing and configurening redux-saga

We can have several saga middleware in different parts of our application

## 15. Creating your first saga

Resume saga execution after delay

```
import {delay} from "redux-saga";
yield delay(1000);
```

# Asynchrous ES6 and yield

## 18. What is yield?

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

## 22. Yield and promises

- code execution resumes when promise is resolved
- if primise throws an error, code stops at yield line and doesnt throw and error

## 23. Wrapping generators

- Yielded promise must still be called manually by some code
- redux saga wraps generators automatically
- Co.js can wrap generators outside of redux-saga app

Without wrapper:

```
function* getData() {
	let data = yield api.call('/cart');
	return data + 5;
}
// wrapper code still needs .then somewhere to capture the response from API and pass it to generator

let gen = getData();
let promise = gen.next();
promise.then(data => {
	let value = get.next(data);
})
```

Sagas are wrapped by redux saga, `.then` is never manually called

```
function* mySaga() {
	yield delay(500);
	yield delay(700);
	console.log('Saga complete');
}
```

## 24. Wrapping generators with redux saga and Co

Run generator with redux saga
Note that promises are resolved automatically
Second argument in `delay` is returned from promise

```
var delayGenerator = function* () {
	let data1 = yield delay(1000, 1);
	console.info("Step 1");
	let data2 = yield delay(2000, 2);
	console.info("Step 2");
	let data3 = yield delay(3000, 3);
	console.info("Step 3");
	return data1 + data2+ data3;
}

var obj = delayGenerator();
// call next() manually, without waiting for promise resolve:

obj.next() // Object(value: Promise, done: false);
Step 1
obj.next() // Object(value: Promise, done: false);
Step 2
obj.next() // Object(value: Promise, done: false);
Step 3
obj.next() // Object(value: NaN, done: true);
```

`NaN` because we didn't wait for promise to be resolved

Using saga's `run` we'll see console logs, since generator is executing, but we don't see the returned values from `next()`

```
run(delayGenerator);
Object{@@redux-saga/TASK: true, ...}
Step 1
Step 2
Step 3
```

Co works differently

# Redux saga effects

## 27. Introduction to effects

- Thread management
  call
  fork
  spawn
  apply
  cancel
- Action creation
  put
- Data seeding
  select
- Flow control
  take
  takeEvery
  takeLates

# 28. Take

code pauses when it gets to `take`

```
let mySaga = function* () {
	console.info("Saga begins");
	const state = yield effects.take("SET_STATE");
	console.info("Got state...", state);
}

run(mySaga)
// Saga begins
// Object{@@redux-saga/TASK: true, ...}

dispatch({type: "SET_STATE", value: 42})
// Got state... Object{type: "SET_STATE", value: 42}
// Object {type: "SET_STATE", values: 42}
```
