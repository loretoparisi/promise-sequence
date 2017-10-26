/**
*  Promise Sequence
*  Based on https://github.com/dotSlashLu/promise-waterfall
* @author Loreto Parisi (loreto at gmail dot com)
*/

(function() {
    
    function isPromise(obj) {
      return obj && typeof obj.then === 'function';
    }

    /**
     * Waterfall of Promises
     * @description See https://github.com/dotSlashLu/promise-waterfall
     * @param list Array Array of Promises
     * @return Promise
     */
    function waterfall(list) {
      // malformed argument
      list = Array.prototype.slice.call(list);
      if (!Array.isArray(list)                    // not an array
          || typeof list.reduce !== "function"    // update your javascript engine
          || list.length < 1                      // empty array
         ) {
        return Promise.reject("Array with reduce function is needed.");
      }
    
      if (list.length == 1) {
        if (typeof list[0] != "function")
          return Promise.reject("First element of the array should be a function, got " + typeof list[0]);
        return Promise.resolve(list[0]());
      }
    
      return list.reduce(function(l, r){
        // first round
        // execute function and return promise
        var isFirst = (l == list[0]);
        if (isFirst) {
          if (typeof l != "function")
            return Promise.reject("List elements should be function to call.");
    
          var lret = l();
          if (!isPromise(lret))
            return Promise.reject("Function return value should be a promise.");
          else
            return lret.then(r);
        }
    
        // other rounds
        // l is a promise now
        // priviousPromiseList.then(nextFunction)
        else {
          if (!isPromise(l))
            Promise.reject("Function return value should be a promise.");
          else 
            return l.then(r);
        }
      });
    }
    
    
    /**
     * Iterate over a sequence of promises
     * @param data Array Array of input
     * @param callback function Callback: input data returns Promise
     * @return Promise
     */
    function sequence(data,callback) {
      var first= data.splice(0,1)[0];//remove first
      var promises=[ () => callback.apply(this,[first]) ]
          .concat(data.map( item => (res) => callback.apply(this,[item]) ));
      return waterfall(promises);
    }
    
    module.exports.Waterfall = waterfall;
    module.exports.Sequence = sequence;
    
    }).call(this);