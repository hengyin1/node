const Promise = require("./promise.js");

const tasks = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000)
})

// tasks.then((value) => {
//     console.log('value1', value);
//     return Promise.resolve(1 + value);
//     // return new Promise((resolve, reject) => {
//     //     setTimeout(() => {
//     //         // resolve(1 + value);
//     //         reject(1 + value);
//     //     }, 1000)
//     // })
// }).then((value) => {
//     console.log('value2', value);
//     // return Promise.reject(9);
//     test.a = 1;
// }).catch((err) => {
//     console.log('catch_err', err);
// })

const tasks1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 1000)
})

Promise.all([tasks, tasks1]).then(res => {
    console.log('all', res);
}).catch((err) => {
    console.log(err);
})