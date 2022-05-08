class Promise {
    constructor(executor) {
        this.dep = [];
        this.pending = true;
        this.fulfilled = false;
        this.rejected = false;
        this.value = undefined;
        this.error = undefined;
        this.resolve = (value) => {
            this.pending = false;
            this.fulfilled = true;
            this.value = value;
            for (const onFulfilled of this.dep) {
                onFulfilled(value);
            }
        }
        this.reject = (error) => {
            this.pending = false;
            this.rejected = true;
            this.error = error;
        }
        executor(this.resolve, this.reject);
    }

    then(onFulfilled, onRejected) {
        if (this.pending) {
            this.dep.push(onFulfilled);
        } else {
            if (this.fulfilled) {
                onFulfilled(this.value);
            } else if (this.rejected) { 
                onRejected(this.error);
            }
        }
    }
}