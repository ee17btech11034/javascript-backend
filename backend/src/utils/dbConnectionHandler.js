// const dbConnectionHandler = () => {}

// There are 2 ways to create:
    // 1. try-Catch
    // 2. promise

/*
    Higher Order function:
        -- functions which take another function as argument or can return another function.

        const dbConnectionHandler = (fn) => () => {}
            OR
        const dbConnectionHandler = (fn) => {() => {}}

    Both are same we just removed  middle {}

*/


/*
// try- catch
const dbConnectionHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (err) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}

*/

// We use promise

const dbConnectionHandler = (fn) =>{
    (req, res, next)=>{
        Promise.resolve(fn(req, res, next)).catch((err)=>{
            next(err)
        })
    }
}