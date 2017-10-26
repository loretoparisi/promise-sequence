# promise-sequence
Iterate over a sequence of promises.

## Examples

### Waterfall example
The `Waterfall` will resolve a list of `Promises` in a waterfall, passing the output of a Promise to the next one. It takes as input a list of functions that must return a `Promise`. The input functions will have as argument the resolved output of the previous Promise. A initial void function must be provided.

```javascript
var promises=   [()=>{
        return new Promise((r,_) => r(0))
    }   ].concat([...new Array(3).keys()].map((item,index) => (res)=>{
        res++;
        return new Promise((r,_) => r(res))
    }
))
Waterfall(promises) .then(res=> console.log(res)) .catch((err) => console.error(err) );
```

### Sequence example
The argument of `Sequence` are a list of input objects and a callback. The input callback must return a `Promise`. The input objects will be passed to the callback. The `Sequence` will resolved when all callbacks have been sequentially called on the input objects.

```javascript
Sequence([...new Array(3).keys()], (res) => new Promise((r,_) => r(res++)) ).then(res => console.log(res))
```

### Disclaimer
Inspired to and based on [promise-waterfall](https://github.com/dotSlashLu/promise-waterfall)
