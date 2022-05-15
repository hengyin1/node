const Promise = require("./promise.js");

const tasks = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
        // reject("error");
    }, 1000)
})

tasks.then((value) => {
    console.log(value);
}, (error) => {
    console.log(error);
})