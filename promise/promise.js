function isPromise(value) {
    return value && typeof value.then === "function";
}

class Promise {
    constructor(executor) {
        this.dep = [];
        this.status = "pending";
        this.value = undefined;
        this.resolve = (value) => {
            this.status = "fulfilled";
            this.value = this.wrapToThenable(value);
            for (const handlers of this.dep) {
                this.value.then.apply(this.value, handlers);
            }

            // this.value = value;
            // if (isPromise(value)) {
            //     for (const onFulfilled of this.dep) {
            //         value.then(onFulfilled);
            //     }
            // } else {
            //     for (const onFulfilled of this.dep) {
            //         onFulfilled(value);
            //     }
            // }

            this.dep = [];
        }
        this.reject = (value) => {
            this.status = "rejected";
            this.value = this.wrapToRejected(value);
            for (const handlers of this.dep) {
                this.value.then.apply(this.value, handlers);
            }
            this.dep = [];
        }

        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        const prev = this;

        onFulfilled = onFulfilled || ((value) => {
            return value;
        })

        onRejected = onRejected || ((value) => {
            return value;
        })

        onFulfilled = this.errHandler(onFulfilled);
        onRejected = this.errHandler(onRejected);

        const promise = new Promise((resolve, reject) => {
            const onSpreadFulfilled = (value) => {
                resolve(onFulfilled(value));
            }

            const onSpreadRejected = (value) => {
                reject(onRejected(value));
            }

            if (prev.status === "pending") {
                prev.dep.push([onSpreadFulfilled, onSpreadRejected]);
            } else {
                prev.value.then(onSpreadFulfilled, onSpreadRejected);

                // if (isPromise(prev.value)) {
                //     prev.value.then(onSpreadFulfilled);
                // } else {
                //     onSpreadFulfilled(prev.value);
                // }
            }
        })

        return promise;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (isPromise(value)) {
                value.then(res => {
                    resolve(res);
                })
            } else {
                resolve(value);
            }
        })
    }

    static reject(value) {
        return new Promise((resolve, reject) => {
            if (isPromise(value)) {
                value.then((res) => {
                    reject(res);
                }).catch((err) => {
                    reject(err);
                })
            } else {
                reject(value);
            }
        })
    }

    static all(args) {
        return new Promise((resolve, reject) => {
            const promiseResults = [];
            let totalNumber = 0;
            let promiseLeng = args.length;
            for (let i = 0; i < promiseLeng; i++) {
                const promise = args[i];
                promise.then((res) => {
                    totalNumber++;
                    promiseResults[i] = res;
                    if (totalNumber == promiseLeng) {
                        resolve(promiseResults);
                    }
                }).catch((err) => {
                    reject(err);
                })
            }
        })
    }

    wrapToThenable(value) {
        if (isPromise(value)) {
            return value;
        } else {
            return {
                then: (onFulfilled) => {
                    return onFulfilled(value);
                }
            }
        }
    }

    wrapToRejected(value) {
        return {
            then: (_, onRejected) => {
                return onRejected(value);
            }
        } 
    }

    errHandler(fun) {
        return (...args) => {
            try {
                return fun(...args);
            } catch (error) {
                this.reject(error);
            }
        }
    }
}

module.exports = Promise