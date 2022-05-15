class Promise {
    constructor(executor) {
        this.dep = [];
        this.depErrors = [];
        this.pending = true;
        this.fulfilled = false;
        this.rejected = false;
        this.value = undefined;
        this.error = undefined;
        this.resolve = (value) => {
            this.pending = false;
            this.fulfilled = true;
            this.value = value;

            if (this.isPromise(value)) {
                for (const onFulfilled of this.dep) {
                    value.then(onFulfilled);
                }
            } else {
                for (const onFulfilled of this.dep) {
                    onFulfilled(value);
                }
            }

            this.dep = [];
        }
        this.reject = (error) => {
            this.pending = false;
            this.rejected = true;
            this.error = error;
            for (const onRejected of this.depErrors) {
                onRejected(error);
            }
            this.depErrors = [];
        }
        executor(this.resolve, this.reject);
    }

    then(onFulfilled, onRejected) {
        const prev = this;

        const promise = new Promise((resolve, reject) => {
            const onSpreadFulfilled = (value) => {
                resolve(onFulfilled(value));
            }

            if (prev.pending) {
                prev.dep.push(onSpreadFulfilled);
                onRejected && prev.depErrors.push(onRejected);
            } else {
                if (prev.fulfilled) {
                    if (this.isPromise(prev.value)) {
                        prev.value.then(onSpreadFulfilled);
                    } else {
                        onSpreadFulfilled(prev.value);
                    }
                } else if (prev.rejected) { 
                    onRejected && reject(onRejected(prev.error));
                }
            }
        })

        return promise;
    }

    isPromise(value) {
        return value && typeof value.then === "function";
    }
}

module.exports = Promise