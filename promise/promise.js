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
            // if (this.isPromise(value)) {
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

                // if (this.isPromise(prev.value)) {
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

    isPromise(value) {
        return value && typeof value.then === "function";
    }

    wrapToThenable(value) {
        if (this.isPromise(value)) {
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