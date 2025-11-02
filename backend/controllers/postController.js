import Post from '../models/Post.js'
import User from '../models/User.js'


export const addPost = async (req, res, next) => {
    const { title, content } = req.body
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404)
        return next(new Error("Invalid user id"))
    }

    const imageUrl = req.file ? req.file.path : null
    let newPost = new Post({
        title,
        content,
        imageUrl,
        userId: req.user.id
    })

    newPost = await newPost.save()

    res.status(200).json({ message: "Post added successfully", id: newPost._id, imageUrl })
}

export const getPosts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const total = await Post.countDocuments()
    const posts = await Post.find().skip(skip).limit(limit).populate("userId", "username").sort({ createdAt: -1 })
    res.status(200).json({
        posts,
        total,
        totalPages: Math.ceil(total / limit)
    })

}