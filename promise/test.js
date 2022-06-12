const Promise = require("./promise.js");

const tasks = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000)
})

tasks.then((value) => {
    console.log('value1', value);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(1 + value);
            reject(1 + value);
        }, 1000)
    })
}).then((value) => {
    console.log('value2', value);
}, (err) => {
    console.log('err', err);
}).catch((err) => {
    console.log('catch_err', err);
})