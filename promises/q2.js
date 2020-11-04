function print(x) {
    console.log(x)
}

// new Promise(res => res(5)).then(print).then(print)

// new Promise(res => res(5)).then(print()).then(print)

new Promise(res => res(5)).then(data => {
    return new Promise(res => res(2 * data))
}).then(print)