import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(400)
        return next(new Error("No token provided"))
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(400)
            return next(new Error("Invalid token"))
        }
        req.user = user
        next()
    })
}



export const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role
        if (!allowedRoles.includes(userRole)) {
            res.status(403)
            return next(new Error("Unauthorized"))
        }
        next()
    }

}


