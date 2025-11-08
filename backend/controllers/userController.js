import Like from '../models/Like.js'
import Post from '../models/Post.js'
import User from '../models/User.js'


export const getUsers = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search
    const role = req.query.role
    const skip = (page - 1) * limit

    const filter = {}

    if (search) {
        filter.$or = [{ username: { $regex: new RegExp(search, "i") } }, { email: { $regex: new RegExp(search, "i") } }]
    }

    if (role) {
        filter.role = role
    }


    const total = await User.countDocuments(filter)
    const users = await User.find(filter).skip(skip).limit(limit).select("-password")

    res.status(200).json({
        users,
        total,
        totalPages: Math.ceil(total / limit)
    })
}


export const makeMod = async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
        res.status(404)
        return next(new Error("No user found"))
    }

    if (user.role === "mod") {
        res.status(400)
        return next(new Error("User is already a moderator"))
    }

    user.role = "mod"
    const updatedUser = await user.save()

    res.status(200).json({
        updatedUser,
        message: "New mod added"
    })
}

export const unMod = async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
        res.status(404)
        return next(new Error("No user found"))
    }

    if (user.role === "mod") {
        user.role = "user"
        const updatedUser = await user.save()

        res.status(200).json({
            updatedUser,
            message: "New mod added"
        })
    }


    res.status(400)
    return next(new Error("User is already a moderator"))
}