function promiseCombiner(...promises) {

    let sum = 0;
    let atLeastOne = false;

    return Promise.allSettled(promises).then(vals => {
        vals.forEach(val => {
            if (val.status === 'fulfilled') {
                atLeastOne = true
                sum += val.value
            }
        })
    }).then(() => {
        return new Promise((res, rej) => {
            if (sum > 0 || atLeastOne) {
                res(sum)
            } else { rej(0) }
        })
    })
}

console.log(promiseCombiner(
    Promise.resolve(2),
    Promise.resolve(3)
));

// --> OUTPUT:

// Promise: resolved with 5

console.log(promiseCombiner(
    Promise.resolve(0),
    Promise.resolve(0)
));

// --> OUTPUT:

// Promise: resolved with 0

console.log(promiseCombiner(
    Promise.resolve(2),
    Promise.resolve(3),
    Promise.reject('Errorr')
));

// --> OUTPUT:

// Promise: resolved with 5

console.log(promiseCombiner(
    Promise.reject('Error'),
    Promise.reject('Another Error')
));

// --> OUTPUT:

// Promise: rejected with 0
