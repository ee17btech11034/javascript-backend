class ApiError extends Error {
    constructor(
        statusCode, 
        message= "Default Error msg",
        errors=[],
        err_stack=""
    ){
        super(message) // override the message of Error class
        this.statusCode = statusCode
        this.data = null // check why it was done this way
        this.message = message 
        this.success = false
        this.errors = errors 

        if (err_stack){ // we can avoid this if-else
            this.stack = err_stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}